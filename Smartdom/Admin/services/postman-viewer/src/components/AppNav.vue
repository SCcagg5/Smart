<template>
    <b-navbar type="is-success">
        <template slot="brand">
            <b-navbar-item href="/postman/">
                Smartdom API viewer
            </b-navbar-item>
        </template>
        <template slot="start">

        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">

                    <a href="https://github.com/SCcagg5/Smart">
                        <b-button size="is-medium" type="is-primary"
	                		icon-left="github-circle">
	                	Github
	            		</b-button>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    export default {
        name: "AppNav",
        props: {
            api: Object
        },
    }
</script>

<style scoped>
</style>
