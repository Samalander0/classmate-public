<script>
  import { page } from '$app/stores' 
  import { currentUser, pb } from '$lib/pocketbase'

  import "$lib/styles/essay.scss";
  import { onMount, tick } from 'svelte';
  import { Check, Pencil, PencilOff, RotateCw, Save, LoaderCircle, CircleCheck } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  import Navbar from '$lib/components/Navbar.svelte';
  import Metatags from '$lib/components/Metatags.svelte';
  import ProPopup from '$lib/components/ProPopup.svelte';

  import DOMPurify from 'isomorphic-dompurify';
  import { marked } from 'marked'
  import toast, { Toaster } from 'svelte-french-toast';

  let title = "Loading...";
  let result = {};
  let data;

  let editing = false;
  let pro_popup = false;

  let essay_content;

  let general_feedback_hidden = true;

  function parseString(input) {
    const htmlParts = [];
    const comments = [];

    // Regular expression to match the patterns: [text]{{comment}}(type)
    const regex = /\[([^\]]+)\]\{\{([^\}]+)\}\}\(([^)]+)\)/g;

    // Track the starting index of unmatched text
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(input)) !== null) {
      const [fullMatch, text, comment, type] = match;

      // Add the unmatched text before the match
      if (match.index > lastIndex) {
        // Append unmatched text to the current <p> tag
        htmlParts.push(input.slice(lastIndex, match.index));
      }

      // Replace matched text with <mark> and collect comments
      htmlParts.push(`<mark class="${type}" tabindex="0">${text}</mark>`);
      comments.push({
        type: type,
        text: text,
        comment: comment.charAt(0).toUpperCase() + comment.slice(1)
      });

      // Update lastIndex to track the end of the match
      lastIndex = regex.lastIndex;
    }

    // Add the remaining unmatched text after the last match
    if (lastIndex < input.length) {
      htmlParts.push(input.slice(lastIndex));
    }

    // Combine everything into paragraphs based on line breaks
    const paragraphs = htmlParts.join('').split('\n').map(line => `<p>${line.trim()}</p>`).join('');

    return { html: paragraphs, comments };
  }

  function scrollClasses() {
    const el = this;
    
    // Check if the element is at the top
    if (el.scrollTop === 0) {
      el.classList.add('at-top');
    } else {
      el.classList.remove('at-top');
    }
    
    // Check if the element is at the bottom
    if (el.scrollHeight - el.scrollTop - 1 < el.clientHeight) {
      el.classList.add('at-bottom');
    } else {
      el.classList.remove('at-bottom');
    }
  }

  onMount(async () => {
    data = await pb.collection('essays').getOne($page.params.id, {expand: 'user'}) 

    title = data.title

    result = parseString(data.commented_essay)
    if (data.saved_html) {
      result.html = data.saved_html
    }

    await tick()

    // Get all the mark elements and comments
    const marks = document.querySelectorAll('.essay mark');
    const comments = document.querySelectorAll('.comments .comment');
    let highlightedIndex = null;
    let highlightedTextIndex = null;

    // Iterate over the mark elements and attach event listeners
    marks.forEach((mark, index) => {
      mark.addEventListener('focus', () => {
        scrollToComment(index);
      });

      mark.addEventListener('blur', () => {
        resetHighlight();
      });
    });

    comments.forEach((comment, index) => {
      comment.addEventListener('focus', () => {
        highlightText(index);
      });

      comment.addEventListener('blur', () => {
        resetText();
      });
    })

    // Function to scroll the corresponding comment into view and apply highlight
    function scrollToComment(index) {
      const commentElement = comments[index];

      if (commentElement) {
        // Scroll the comment into view, centered
        commentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Add the 'highlighted' class to the comment
        commentElement.classList.add('highlighted');

        // Keep track of the currently highlighted comment
        highlightedIndex = index;
      }
    }

    // Function to reset the highlight when mouse leaves the mark element
    function resetHighlight() {
      if (highlightedIndex !== null) {
        const commentElement = comments[highlightedIndex];
        if (commentElement) {
          commentElement.classList.remove('highlighted');
        }
        highlightedIndex = null;
      }
    }

    function highlightText(index) {
      const textElement = marks[index]

      textElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      textElement.classList.add('highlighted');

      highlightedTextIndex = index
    }
    function resetText() {
      if (highlightedTextIndex !== null) {
        const textElement = marks[highlightedTextIndex];
        if (textElement) {
          textElement.classList.remove('highlighted');
        }
        highlightedTextIndex = null;
      }
    }
  })

  async function resubmit() {
    await save();

    goto(`/feedback/?resubmit=${data.id}`)
  }

  let width = 1000;
  onMount(() => {
    width = window.innerWidth;
  })
  function recalculateWidth() {
    width = window.innerWidth;
  }

  let save_state = "none";
  async function save() {
    save_state = "loading";

    try {
      const updated = await pb.collection('essays').update(data.id, {
        original_essay: essay_content.innerText,
        saved_html: essay_content.innerHTML
      })
      console.log(updated)

      save_state = "saved"
      toast.success('Saved!', {
        position: "bottom-right"
      })
      setTimeout(() => {
        save_state = "none"
      }, 1000)
    } catch (err) {
      console.error(err)
    }
  }
</script>

<svelte:window on:resize={recalculateWidth}/>

<Toaster />

{#if title == "Loading..."}
  <Metatags title="Essay Feedback" description="View AI-powered essay feedback on Classmate"/>
{:else}
  <Metatags title={title} description="View AI-powered essay feedback on Classmate"/>
{/if}

<Navbar/>

<ProPopup feature="the built-in editor" bind:visible={pro_popup}/>

<div class="essay-main">
  <div class="essay">
    <h1>{title}</h1>
    {#if data?.general_feedback}
      <div class={general_feedback_hidden ? "general-feedback hidden" : "general-feedback expanded"}>
        <h2>General Feedback</h2>
        <div class="general-content">
          {@html marked(DOMPurify.sanitize(data.general_feedback))}
        </div>
        <button class="general-feedback-button" on:click={() => {general_feedback_hidden = !general_feedback_hidden}}>
          {#if general_feedback_hidden}
            Show more
          {:else}
            Show less
          {/if}
        </button>
      </div>
    {/if}
    {#if result.html}
      <div class="essay-content" contenteditable={editing} bind:this={essay_content}>
        {@html result.html}
      </div>
    {:else}
      Loading...
    {/if}
  </div>
  <aside class="comments">
    {#if $currentUser && data?.expand?.user.id == $currentUser?.id}
      <div class="toolbar">
        <h3>Tools</h3>
        <div class="toolbar-buttons">
          {#if $currentUser && $currentUser.plan == 'pro'}
            <button class={editing ? "active" : ""} on:click={() => {editing = !editing}}>
              {#if editing}
                <PencilOff size="16"/>
              {:else}
                <Pencil size="16"/>
              {/if}
              {#if width > 1320}
                Edit
              {/if}
            </button>
          {:else}
            <button class="disabled" on:click={() => {pro_popup = true}}>
              <Pencil size="16"/>
              {#if width > 1320}
                Edit
              {/if}
            </button>
          {/if}
          <button class={save_state == "none" ? "" : "disabled"} on:click={save}>
            {#if save_state == "loading"}
              <LoaderCircle size="16" class="loader-circle"/>
            {:else if save_state == "saved"}
              <CircleCheck size="16"/>
            {:else}
              <Save size="16"/>
            {/if}
            {#if width > 1400}
              Save
            {/if}
          </button>
          {#if $currentUser.plan == "pro" || $currentUser.credits > 0}
            <button on:click={resubmit}>
              <RotateCw size="16"/>
              {#if width > 1250}
                Resubmit
              {/if}
            </button>
          {:else}
            <button class="disabled" on:click={() => {toast.error('You are out of credits', {
              position: "bottom-right"
            })}}>
              <RotateCw size="16"/>
              {#if width > 1250}
                Resubmit
              {/if}
            </button>
          {/if}
        </div>
      </div>
    {/if}
    <div class="comments-wrapper at-top" on:scroll={scrollClasses}>
      {#if result.comments}
        {#each result.comments as comment}
          <div class="comment" tabindex="0" role="button">
            <div class="comment-header">
              <div class="info">
                <div class={`info-img ${comment.type}`}>
                  <img src="/logo.svg" alt="classmate logo"/>
                </div>
                <div>
                  <h3>Classmate AI</h3>
                  <p>
                    {#if comment.type == "star"}
                      Star
                    {:else if comment.type == "word-reduction"}
                      Word Reduction Suggestion
                    {:else if comment.type == "grammar-spelling"}
                      Grammar/Spelling Suggestion
                    {:else}
                      General Feedback
                    {/if}
                  </p>
                </div>
              </div>
              <!--
              <button class="resolve">
                <Check/>
              </button>
              -->
            </div>
            <p>{comment.comment}</p>
          </div>
        {/each}
      {/if}
    </div>
  </aside>
</div>