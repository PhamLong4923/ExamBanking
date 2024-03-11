import Http from "./Http";

export const getProducts = (config) => Http.get("/products", config);

export const getCategories = (config) => Http.get("/categories", config);

export const getCategory = (id, config) => Http.get(`/categories/${id}`, config);

export const getProdctCategory = (id, config) => Http.get(`/categories/${id}/products`, config);

export const getProduct = (id, config) => Http.get(`/products/${id}`, config);

export const getCommentByProduct = (id, config) => Http.get(`/products/${id}/comments`, config);

export const createCommnetsProduct = (id,data, config) => Http.post(`/products/${id}/comments`, data, config);

export const order = (data, config) => Http.post(`/order`, data, config);

//my 

//account-api

export const signUp = () => Http.post("");

export const login = () => Http.get("/Login/google");

//get-api

export const getBank = (config) => Http.post("/Bank/GetBank", config);

export const getSection = () => Http.get("");

export const getRepository = () => Http.get("");

export const getQuestions = (repoid) => Http.get("");

export const getQuestionType = () => Http.get();

export const getQuestionMode = () => Http.get();

//create-api

export const addBank = () => Http.get("");

export const addSection = () => Http.get("");

export const addRepository = () => Http.get("");

export const addQuestion = () => Http.get("");

//delete-api

export const delBank = () => Http.get("");

export const delSection = () => Http.get("");

export const delRepository = () => Http.get("");

export const delQuestions = () => Http.get("");

//update-api

export const updateBank = () => Http.get("");

export const updateSection = () => Http.get("");

export const updateRepository = () => Http.get("");

export const updateQuestion = () => Http.get("");

export const updateAccount = () => Http.get("");

//




