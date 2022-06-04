import axios from "axios";

export default {
    state: {
        historyProducts: [],
        historyQueries: [],
        randomQueries: [],
    },
    getters: {
        historyProducts(state) {
            return state.historyProducts;
        },
        historyQueries(state) {
            return state.historyQueries;
        },
        randomQueries(state) {
            return state.randomQueries;
        },
    },
    mutations: {
        setHistoryProducts(state, products) {
            state.historyProducts = products;
        },
        checkHistoryProduct(state, productId) {
            let indexProduct = -1;
            state.historyProducts.forEach((product, index) => {
                if (product._id === productId) {
                    indexProduct = index;
                }
            });
            if (indexProduct !== -1) {
                state.historyProducts.splice(indexProduct, 1);
            }
        },
        unshiftHistoryProduct(state, product) {
            state.historyProducts.unshift(product);
            state.historyProducts = state.historyProducts.slice(0, 10);
        },
        setHistoryQueries(state, queries) {
            state.historyQueries = queries;
        },
        checkHistoryQuery(state, query) {
            const index = state.historyQueries.indexOf(query);
            if (index !== -1) {
                state.historyQueries.splice(index, 1);
            }
        },
        unshiftHistoryQuery(state, query) {
            state.historyQueries.unshift(query);
            state.historyQueries = state.historyQueries.slice(0, 4);
        },
        pushRandomHistoryQueries(state, queries) {
            queries.forEach((query) => {
                state.randomQueries.push(query.title);
            });
        },
    },
    actions: {
        async getRandomQueries({ commit, state }) {
            const queries = (await axios.get("/random")).data;
            commit("pushRandomHistoryQueries", queries);
        },
        addHistoryProduct({ commit, state }, product) {
            commit("checkHistoryProduct", product._id);
            commit("unshiftHistoryProduct", product);
            localStorage.historyProducts = JSON.stringify(state.historyProducts);
        },
        addHistoryQuery({ commit, state }, query) {
            commit("checkHistoryQuery", query);
            commit("unshiftHistoryQuery", query);
            localStorage.historyQueries = JSON.stringify(state.historyQueries);
        },
    },
};
