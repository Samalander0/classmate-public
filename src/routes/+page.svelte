<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Metatags from '$lib/components/Metatags.svelte';
  import { onMount } from 'svelte';
  import { pb, currentUser } from '$lib/pocketbase';

  import { ArrowRight, Check } from 'lucide-svelte';

  import '$lib/styles/new_landing.scss';

  let step = 1;
  let last_step = 1;

  function toggleStep(step_number) {
    last_step = step_number;
    if (step == step_number) {
      step = 0
    } else {
      step = step_number
    }
  }

  let accordion = 0;
  function toggleAccordion(accordion_number) {
    if (accordion == accordion_number) {
      accordion = 0
    } else {
      accordion = accordion_number
    }
  }

  let width = 1100;
  onMount(() => {
    width = window.innerWidth;
  })
  function recalculateWidth() {
    width = window.innerWidth;
  }

  import { gsap } from "gsap/dist/gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    if (window.innerWidth >= 1000) {
      gsap.to(".device", {
        y: "-5vh",
        scrollTrigger: {
          trigger: ".landing-header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
      gsap.to(".header-image .comment-1", {
        y: "-5vh",
        scrollTrigger: {
          trigger: ".landing-header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
      gsap.to(".header-image .comment-2", {
        y: "-10vh",
        scrollTrigger: {
          trigger: ".landing-header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
      gsap.to(".header-image .comment-3", {
        y: "-20vh",
        scrollTrigger: {
          trigger: ".landing-header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })

      gsap.to(".why-image-mockup", {
        y: "-15rem",
        scrollTrigger: {
          trigger: ".landing-why",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      })

      gsap.from(".landing-faqs .accordion:nth-of-type(1)", {
        opacity: 0,
        duration: 0.1,
        y: "1rem",
        scrollTrigger: {
          trigger: ".landing-faqs .accordion:nth-of-type(1)",
          start: "bottom bottom"
        }
      })
      gsap.from(".landing-faqs .accordion:nth-of-type(2)", {
        opacity: 0,
        duration: 0.1,
        y: "1rem",
        scrollTrigger: {
          trigger: ".landing-faqs .accordion:nth-of-type(2)",
          start: "bottom bottom"
        }
      })
      gsap.from(".landing-faqs .accordion:nth-of-type(3)", {
        opacity: 0,
        duration: 0.1,
        y: "1rem",
        scrollTrigger: {
          trigger: ".landing-faqs .accordion:nth-of-type(3)",
          start: "bottom bottom"
        }
      })
      gsap.from(".landing-faqs .accordion:nth-of-type(4)", {
        opacity: 0,
        duration: 0.1,
        y: "1rem",
        scrollTrigger: {
          trigger: ".landing-faqs .accordion:nth-of-type(4)",
          start: "bottom bottom"
        }
      })

      gsap.from(".landing-cta .cta-comments .comment:nth-of-type(1)", {
        opacity: 0,
        scale: 0.9,
        duration: 0.1,
        scrollTrigger: {
          trigger: ".landing-cta .cta-comments .comment:nth-of-type(1)",
          start: "bottom bottom"
        }
      })
      gsap.from(".landing-cta .cta-comments .comment:nth-of-type(2)", {
        opacity: 0,
        scale: 0.4,
        duration: 0.1,
        scrollTrigger: {
          trigger: ".landing-cta .cta-comments .comment:nth-of-type(2)",
          start: "bottom bottom"
        }
      })
      gsap.from(".landing-cta .cta-comments .comment:nth-of-type(3)", {
        opacity: 0,
        scale: 0.9,
        duration: 0.1,
        scrollTrigger: {
          trigger: ".landing-cta .cta-comments .comment:nth-of-type(3)",
          start: "bottom bottom"
        }
      })
      gsap.from(".landing-cta .cta-comments .comment:nth-of-type(4)", {
        opacity: 0,
        scale: 0.4,
        duration: 0.1,
        scrollTrigger: {
          trigger: ".landing-cta .cta-comments .comment:nth-of-type(4)",
          start: "bottom bottom"
        }
      })
    }
  })
</script>

<svelte:window on:resize={recalculateWidth}></svelte:window>

<Metatags title="Classmate | AI-powered writing feedback"/>

<main class="landing-main">
  <header class="landing-header">
    <Navbar/>
    <div class="header-content">
      <h1>Instant AI-powered writing<br/>
        feedback, available for all</h1>
      <div class="header-cta">
        <a href={$currentUser ? "feedback" : "auth"} class="button">Get Started <ArrowRight size="16"/></a>
        <p>Get feedback on any type of writing<br/> instantly and for free today.</p>
      </div>
      <div class="header-image">
        <div class="header-image-wrapper">
          <img class="device" src={width >= 1000 ? "/images/mockup.webp" : "images/phone-mockup-2.png"} alt="Classmate mockup"/>
          <div class="comment comment-1">
            <div class="comment-header">
              <div class="info">
                <div class={`info-img general-feedback`}>
                  <img src="/logo.svg" alt="classmate logo"/>
                </div>
                <div>
                  <h3>Classmate AI</h3>
                  <p>
                    General Feedback
                  </p>
                </div>
              </div>
              <button class="resolve" aria-label="resolve comment">
                <Check/>
              </button>
            </div>
            <p>The phrase feels a bit abstract. Can you provide a specific example of what you're curious about or a question you aim to explore to ground this idea?</p>
          </div>
          <div class="comment comment-2">
            <div class="comment-header">
              <div class="info">
                <div class={`info-img star`}>
                  <img src="/logo.svg" alt="classmate logo"/>
                </div>
                <div>
                  <h3>Classmate AI</h3>
                  <p>
                    Star
                  </p>
                </div>
              </div>
              <button class="resolve" aria-label="resolve comment">
                <Check/>
              </button>
            </div>
            <p>The phrase "deepen self-awareness" is a strong, vivid expression.</p>
          </div>
          <div class="comment comment-3">
            <div class="comment-header">
              <div class="info">
                <div class={`info-img word-reduction`}>
                  <img src="/logo.svg" alt="classmate logo"/>
                </div>
                <div>
                  <h3>Classmate AI</h3>
                  <p>
                    Word Reduction
                  </p>
                </div>
              </div>
              <button class="resolve" aria-label="resolve comment">
                <Check/>
              </button>
            </div>
            <p>Could you reword this to be more concise? You use the word 'Excited' often.</p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!--
  <div class="landing-social-proof">
    <h2>Used by students at</h2>
    <div class="social-logos">
      <img src="https://schoolmanager.s3.amazonaws.com/uploads/pictures/f89ed104207d4101b3d1e0438e7f9f42.png" alt="logo"/>
      <img src="https://schoolmanager.s3.amazonaws.com/uploads/pictures/f89ed104207d4101b3d1e0438e7f9f42.png" alt="logo"/>
      <img src="https://schoolmanager.s3.amazonaws.com/uploads/pictures/f89ed104207d4101b3d1e0438e7f9f42.png" alt="logo"/>
      <img src="https://schoolmanager.s3.amazonaws.com/uploads/pictures/f89ed104207d4101b3d1e0438e7f9f42.png" alt="logo"/>
    </div>
  </div>
  -->
  <div class="landing-hiw">
    <div class="hiw-intro">
      <h2>How it Works</h2>
      <div class="step-text">
        <p class={step == 0 ? "selected" : ""} style={`transform: translateY(-${step}00%)`}>Classmate can help you find areas to improve your writing, write more effectively, and score better on assignments. To learn about the process, select a step below.</p>
        <p class={step == 1 ? "selected" : ""} style={`transform: translateY(-${step}00%)`}>Classmate gives contextual feedback based on provided prompts, instructions, or context. You can specify a writing type and specific focus for your feedback.</p>
        <p class={step == 2 ? "selected" : ""} style={`transform: translateY(-${step}00%)`}>After 10-20 seconds, you'll get both general feedback and detailed inline feedback. Inline feedback includes stars, grammar & spelling, and word count reduction suggestions.</p>
        <p class={step == 3 ? "selected" : ""} style={`transform: translateY(-${step}00%)`}>Classmate's built-in editor lets you edit right where the feedback is. Resolve comments, make edits, and resubmit when you're done, all inside Classmate.</p>
      </div>
    </div>
    <div class="hiw-steps" style={`--selected: ${last_step}`}>
      <button on:click={() => {toggleStep(1)}} class={step == 1 ? "selected" : ""}>1 — Submit your essay</button>
      <button on:click={() => {toggleStep(2)}} class={step == 2 ? "selected" : ""}>2 — Get feedback</button>
      <button on:click={() => {toggleStep(3)}} class={step == 3 ? "selected" : ""}>3 — Revise, edit, & improve</button>
    </div>
    <div class="hiw-display">
      <img class="display" src="/images/display.png" alt="display (decorative)"/>
      <div class="screen">
        <img src="/images/step-1.png" alt="screen" style={`transform: translateY(-${last_step - 1}00%)`}/>
        <img src="/images/step-2.png" alt="screen" style={`transform: translateY(-${last_step - 1}00%)`}/>
        <img src="/images/step-3.png" alt="screen" style={`transform: translateY(-${last_step - 1}00%)`}/>
      </div>
    </div>
  </div>
  <div class="landing-why">
    <div class="why-image">
      <img class="why-image-mockup" src="/images/phone-mockup-2.png" alt="phone mockup"/>
    </div>
    <div class="why-content">
      <div class="why-wrapper">
        <h2>Why we made Classmate</h2>
        <p>Private tutoring and counseling isn't accessible to all students. Classmate was created by students to increase equity and bring detailed feedback to help all students improve.</p>
        <a href={$currentUser ? "feedback" : "auth"} class="button">Get Started <ArrowRight size="16"/></a>
      </div>
    </div>
  </div>
  <div class="landing-faqs">
    <div class="accordion">
      <button on:click={() => {toggleAccordion(1)}} class={accordion == 1 ? "accordion-trigger open" : "accordion-trigger"}>
        <span class="trigger"><span>+</span></span>
        <h3>What is Classmate and how does it work?</h3>
      </button>
      <div class="accordion-body">
        <p>Classmate is an AI-powered feedback tool, to give both a general overview of feedback, and specific inline comments. Classmate works by using OpenAI's GPT models to analyze your writing and give advanced feedback. Getting feedback takes less than 30 seconds.</p>
      </div>
    </div>
    <div class="accordion">
      <button on:click={() => {toggleAccordion(2)}} class={accordion == 2 ? "accordion-trigger open" : "accordion-trigger"}>
        <span class="trigger"><span>+</span></span>
        <h3>Is Classmate free to use?</h3>
      </button>
      <div class="accordion-body">
        <p>When signing up for Classmate, you get 10 free credits. Unlimited essay reviews and premium features like the built-in editor are available to Classmate Pro subscribers. Classmate Pro subscribers allow us to offer a free plan and keep Classmate running. If you're on a free plan and would like a credit recharge, contact us through the chat button located in the bottom right of the website.</p>
      </div>
    </div>
    <div class="accordion">
      <button on:click={() => {toggleAccordion(3)}} class={accordion == 3 ? "accordion-trigger open" : "accordion-trigger"}>
        <span class="trigger"><span>+</span></span>
        <h3>What makes Classmate unique?</h3>
      </button>
      <div class="accordion-body">
        <p>Classmate is fast, easy, detailed, and free to start. Unlike other writing feedback tools, Classmate offers inline feedback in addition to general feedback, with specific focus modes and models for specific use cases like college admissions essays.</p>
      </div>
    </div>
    <div class="accordion">
      <button on:click={() => {toggleAccordion(4)}} class={accordion == 4 ? "accordion-trigger open" : "accordion-trigger"}>
        <span class="trigger"><span>+</span></span>
        <h3>Can I get Classmate for my school or institution?</h3>
      </button>
      <div class="accordion-body">
        <p>We'd love to work with you! Contact us at support@classmate.app.</p>
      </div>
    </div>
  </div>
  <div class="landing-cta">
    <div class="cta-content">
      <h2>Feedback. Instantly.</h2>
      <p>Get ready to improve your writing process. Classmate is for you for instant 24/7 feedback, finding areas to improve, and learning to make your writing better.</p>
      <a href={$currentUser ? "feedback" : "auth"} class="button">Improve your writing <ArrowRight size="16"/></a>
    </div>

    <div class="cta-comments">
      <div class="comment comment-1">
        <div class="comment-header">
          <div class="info">
            <div class={`info-img general-feedback`}>
              <img src="/logo.svg" alt="classmate logo"/>
            </div>
            <div>
              <h3>Classmate AI</h3>
              <p>
                General Feedback
              </p>
            </div>
          </div>
          <button class="resolve" aria-label="resolve comment">
            <Check/>
          </button>
        </div>
        <p>The phrase feels a bit abstract. Can you provide a specific example of what you're curious about or a question you aim to explore to ground this idea?</p>
      </div>
      <div class="comment comment-2">
        <div class="comment-header">
          <div class="info">
            <div class={`info-img star`}>
              <img src="/logo.svg" alt="classmate logo"/>
            </div>
            <div>
              <h3>Classmate AI</h3>
              <p>
                Star
              </p>
            </div>
          </div>
          <button class="resolve" aria-label="resolve comment">
            <Check/>
          </button>
        </div>
        <p>The phrase "deepen self-awareness" is a strong, vivid expression.</p>
      </div>
      <div class="comment comment-3">
        <div class="comment-header">
          <div class="info">
            <div class={`info-img word-reduction`}>
              <img src="/logo.svg" alt="classmate logo"/>
            </div>
            <div>
              <h3>Classmate AI</h3>
              <p>
                Word Reduction
              </p>
            </div>
          </div>
          <button class="resolve" aria-label="resolve comment">
            <Check/>
          </button>
        </div>
        <p>Could you reword this to be more concise? You use the word 'Excited' often.</p>
      </div>
      <div class="comment comment-4">
        <div class="comment-header">
          <div class="info">
            <div class={`info-img grammar-spelling`}>
              <img src="/logo.svg" alt="classmate logo"/>
            </div>
            <div>
              <h3>Classmate AI</h3>
              <p>
                Grammar & Spelling
              </p>
            </div>
          </div>
          <button class="resolve" aria-label="resolve comment">
            <Check/>
          </button>
        </div>
        <p>This sentence may be hard to understand for readers. Consider breaking it up into two sentences for improved flow.</p>
      </div>
    </div>
  </div>
  <Footer/>
</main>