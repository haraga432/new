<script>
import { onMount } from 'svelte';
export let id = '';
export let end = 0;
export let duration = 1000;
let value = 0;

onMount(() => {
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    function update() {
        start += step;
        if (start >= end) {
            value = end;
        } else {
            value = start;
            requestAnimationFrame(update);
        }
    }
    update();
});
</script>
<span id={id}>{value}</span> 