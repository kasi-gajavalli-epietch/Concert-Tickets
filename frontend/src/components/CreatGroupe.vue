<template>
    <section>
        <section class="hero is-primary is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                            <form action="" class="box">
                                <label for="" class="label">Crée Un Groupe</label>


                                <div class="field">
                                    <label for="" class="label">Groupe</label>
                                    <div class="control has-icons-left">
                                        <input type="name" placeholder="ACDC" class="input" required>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-info"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field">
                                    <label for="" class="label">Affiche</label>
                                    <div class="control has-icons-left">
                                        <input type="file" class="input" required>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-file-image-o"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field">
                                    <label for="" class="label">Description</label>
                                    <div class="control has-icons-left">
                                        <textarea id="textarea-field" cols="45" rows="4"></textarea>
                                    </div>
                                </div>

                                <div class="field">
                                    <button class="button is-success">
                                        Crée
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.column.is-5-tablet.is-4-desktop.is-3-widescreen {
    width: 45%;

}

.box {
    background-color: #000000f0;
}

.label {
    color: #e5e5e5;
}
</style>