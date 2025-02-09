<template>
    <div>
        <input type="button" @click="return_home" value="Retour à la page principale" />
        <!--- Faire le lien avec les routes !!--->
    </div>
</template>

<script>
export default {
    name: "Script",
    methods: {
        return_home() {
            this.$router.push("/");
        }
    }

}
</script>