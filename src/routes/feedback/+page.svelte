<script>
  import '$lib/styles/feedback.scss';
  import { Trash, Info } from 'lucide-svelte';

  import { currentUser, pb } from '$lib/pocketbase'

  import Navbar from '$lib/components/Navbar.svelte';
  import Auth from '$lib/components/Auth.svelte';
  import Metatags from '$lib/components/Metatags.svelte';

  import dayjs from 'dayjs'; 
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let loading = false,
      error = false;

  let title,
      prompt,
      essay;
  
  let output,
    general_output,
    record;

  let load_num = 0;

  async function getFeedback() {
    loading = true;

    if (credits < 1 && $currentUser.plan == 'free') {
      error = "You are out of credits"
      return; // Exit if credits is 0 or less
    }

    try {
      if (!essay) {
        error = "No essay text provided"
        return;
      }

      const query = `?essay_title=${title}&essay_prompt=${prompt}&essay_text=${encodeURIComponent(essay)}`

      setTimeout(() => {
        load_num = 1
      }, 1200)
      setTimeout(() => {
        load_num = 2
      }, 5400)
      setTimeout(() => {
        load_num = 3
      }, 11300)
      setTimeout(() => {
        load_num = 4
      }, 14200)

      const [comment_response, general_response] = await Promise.all([
        fetch('./../api/comments/' + query),
        fetch('./../api/general_feedback/' + query)
      ]);

      output = await comment_response.json();
      general_output = await general_response.json()

      if ($currentUser.plan == 'free') {
        await pb.collection('users').update($currentUser.id, {
          credits: credits - 1
        })
      }
      record = await pb.collection('essays').create({
        user: $currentUser.id,
        original_essay: essay,
        title: title,
        prompt: prompt,
        type: "college",
        commented_essay: output,
        general_feedback: general_output
      })

      goto(`/essay/${record.id}`)
    } catch (err) {
      console.log(err)
      error = err
    }
  }
  async function resubmit(id) {
    loading = true;

    if (credits < 1 && $currentUser.plan == 'free') {
      error = "You are out of credits"
      return; // Exit if credits is 0 or less
    }

    try {
      const old_essay = await pb.collection('essays').getOne(id);

      const query = ``

      setTimeout(() => {
        load_num = 1
      }, 1200)
      setTimeout(() => {
        load_num = 2
      }, 5400)
      setTimeout(() => {
        load_num = 3
      }, 11300)
      setTimeout(() => {
        load_num = 4
      }, 14200)

      const [comment_response, general_response] = await Promise.all([
        fetch('./../api//' + query),
        fetch('./../api//' + query)
      ]);

      output = await comment_response.json();
      general_output = await general_response.json()

      if ($currentUser.plan == 'free') {
        await pb.collection('users').update($currentUser.id, {
          credits: credits - 1
        })
      }
      record = await pb.collection('essays').update(id, {
        commented_essay: output,
        general_feedback: general_output,
        saved_html: ""
      })

      goto(`/essay/${record.id}`)
    } catch (err) {
      console.log(err)
      error = err
    }
  }

  let essays,
      credits = 0;

  onMount(async () => {
    if ($currentUser) {
      const resubmit_id = $page.url.searchParams.get('resubmit');
      if (resubmit_id) {
        loading = true;
        resubmit(resubmit_id)
      }

      essays = await pb.collection('essays').getFullList({filter: `user="${$currentUser.id}"`, sort: "-created"})
      const userInfo = await pb.collection('users').getOne($currentUser.id)
      currentUser.set(userInfo) // Update the writable
      credits = userInfo.credits
    }
  })

  async function deleteEssay(essay_id) {
    if (window.confirm("Are you sure you want to delete this essay?")) {
      try {
        pb.collection('essays').delete(essay_id);
        essays = essays.filter(item => item.id !== essay_id);
      } catch (err) {
        alert(err)
      }
    }
  }
</script>

<Metatags title="Get Feedback"/>

<Navbar/>

<div class="feedback-app">
  {#if $currentUser}
    <main class="feedback-main">
      <form class="feedback-form" on:submit|preventDefault={getFeedback}>
        <h2>Get feedback</h2>
        <div class="form-wrapper">
          <fieldset>
            <div>
              <label for="title">Essay Title <div class="info-icon" data-title="The title of your essay. It can just be whatever the type of essay is (e.g. common app personal statement), or something more custom."><Info size="16"/></div></label>
              <input bind:value={title} type="text" id="title" required/>
            </div>
            <div>
              <label for="prompt">Essay Prompt <div class="info-icon" data-title="Provided prompt of the essay. You can also include max word count here."><Info size="16"/></div></label>
              <textarea bind:value={prompt} id="prompt" required></textarea>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label for="essay">Essay Text <div class="info-icon" data-title="Just the essay's text. Don't include any titles or headers."><Info size="16"/></div></label>
              <textarea bind:value={essay} id="essay" required></textarea>
            </div>

            <input type="submit" value="Get Feedback" class="button" disabled={credits == 0}/>
          </fieldset>
        </div>
      </form>

      {#if $currentUser.plan == 'free'}
        <div class="feedback-pricing">
          <h2><mark class={credits == 0 ? "out-of-credits" : ""}>{credits}</mark> Essay Reviews Remaining</h2>
          <div class="feedback-bento">
            <div class="cta">
              <div class="pro-features">
                <p>
                  Upgrade to Classmate Pro, and get unlimited essay reviews, plus more, for only $5.99/mo
                </p>
                <p>
                  ✅ ♾️ Unlimited essay reviews<br/>
                  ✅ The newest AI models<br/>
                  ✅ Early access to new features<br/>
                  ✅ Support Classmate's development
                </p>
              </div>
              <div class="cta-button">
                <a href="/pro" class="button">Upgrade Now</a>
              </div>
            </div>
            <div class="side-box">
              <h2>Upcoming Features</h2>
              <ul>
                <li><s>(Soon) Word count reduction suggestions</s> ✅</li>
                <li><s>(Soon) Build-in essay editor</s> ✅</li>
                <li><s>(Soon) View previous essay feedback</s> ✅</li>
                <li><s>(Soon) General essay feedback</s> ✅</li>
                <li>Specify a focus for the feedback</li>
                <li>Essay feedback for other essay types</li>
              </ul>
            </div>
          </div>
        </div>
      {/if}

      {#if essays?.length}
        <div class="past-essays">
          <h2>Your essays</h2>
          {#each essays as essay}
            <div class="past-essay">
              <h3>{essay.title}</h3>
              <div class="past-essay-buttons">
                <a href={`/essay/${essay.id}`} class="button">View</a>
                <button class="button button-secondary" on:click={() => {deleteEssay(essay.id)}}>
                  <Trash size="16"/>
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </main>
    {#if loading}
      <div class="feedback-loading">
        {#if error}
          <h1>An error occured</h1>
          <p>{error}</p>
        {:else}
          <div class="loading-screen">
            <svg viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
            <h1 class="load-title">Loading ({(output ? 1 : 0) + (general_output ? 1 : 0) + load_num}/6)</h1>
          </div>
        {/if}
      </div>
    {/if}
  {:else}
    <Auth/>
  {/if}
</div>