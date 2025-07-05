<script lang="ts">
import dateFormat from "dateformat";

export let date: string;

const _formatted = dateFormat(date, "HH:MM, d mmm yyyy");
</script>

🕑{formatted}
