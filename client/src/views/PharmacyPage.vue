<template>
    <search-header></search-header>
    <pharmacy-container
        :pharmacy-id="pharmacyId"
        :pharmacy-data="pharmacyData"
        v-if="!loadingPharmacyData"
    ></pharmacy-container>
    <pharmacy-container-sceleton v-else></pharmacy-container-sceleton>
    <pharmacy-stocks-container :pharmacy-id="pharmacyId"></pharmacy-stocks-container>
</template>
<script>
import SearchHeader from "@/components/SearchHeader.vue";
import PharmacyContainer from "@/components/PharmacyContainer.vue";
import PharmacyContainerSceleton from "@/components/PharmacyContainerSceleton.vue";
import PharmacyStocksContainer from "@/components/PharmacyStocksContainer.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    components: { SearchHeader, PharmacyContainer, PharmacyContainerSceleton, PharmacyStocksContainer },
    data() {
        return {
            pharmacyId: this.$route.params.id,
        };
    },
    methods: {
        ...mapMutations([
            "changeLoadingPharmacyData",
            "clearPharmacyData",
            "changeLoadingPharmacyStocksData",
            "clearPharmacyStocksData",
        ]),
        ...mapActions(["getPharmacyDataAPI", "getPharmacyStocksDataAPI"]),
        getPharmacyData() {
            this.clearPharmacyData();
            this.changeLoadingPharmacyData(true);
            setTimeout(() => {
                this.getPharmacyDataAPI(this.pharmacyId).catch((e) => {
                    if (e.response.status === 404) {
                        this.$router.push({ name: "notFound" });
                    }
                });
            }, 1000);
        },
        // getStocksData() {
        //     this.clearPharmacyStocksData();
        //     this.changeLoadingPharmacyStocksData(true);
        //     setTimeout(() => {
        //         this.getPharmacyStocksDataAPI(this.pharmacyId);
        //     }, 1000);
        // },
    },
    computed: {
        ...mapGetters(["pharmacyData", "loadingPharmacyData", "pharmacyStocksData", "loadingPharmacyStocksData"]),
        pharmacyDataEmpty() {
            return !Object.getOwnPropertyNames(this.pharmacyData).length;
        },
    },
    watch: {
        $route(value) {
            if (this.$route.name === "pharmacy" && value.params.id) {
                this.pharmacyId = this.$route.params.id;
                this.getPharmacyData();
                // this.getStocksData();
            }
        },
    },
    mounted() {
        if (this.pharmacyDataEmpty || this.pharmacyId !== this.pharmacyData?._id) {
            this.getPharmacyData();
            // this.getStocksData();
        }
    },
};
</script>
<style lang="css" scoped>
</style>