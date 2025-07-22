<script>
let openIndex = null;
export let items = [];
function toggle(idx) {
    openIndex = openIndex === idx ? null : idx;
}
</script>
<div class="faq-list">
    {#each items as item, idx}
        <div class="faq-item {openIndex === idx ? 'open' : ''}">
            <button class="faq-question" on:click={() => toggle(idx)}>
                {item.question}
                <span class="faq-toggle">{openIndex === idx ? '–' : '+'}</span>
            </button>
            <div class="faq-answer" style="max-height:{openIndex === idx ? '400px' : '0'};overflow:hidden;transition:max-height 0.3s;">
                {item.answer}
            </div>
        </div>
    {/each}
</div> 