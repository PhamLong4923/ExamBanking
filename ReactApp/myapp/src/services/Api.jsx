import Http from "./Http";

//account-api

export const useGoogle = (token) => Http.post("/GoogleAuth/save-jwt-data", token);

export const signUp = () => Http.post("");

export const login = () => Http.post("");

//get-api

export const getBank = () => Http.get("/Bank/GetBank");

export const getSection = (repoid) => Http.get("/Section/listSection", repoid);

export const getRepository = (bankid) => Http.post("/Repositories/GetRepo", bankid);

export const getQuestions = (secid) => Http.get(`/Question/listQuestion?sectionid=${secid}`);

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

export const updateBank = (data) => Http.get("/Bank/EditBank", data);

export const updateSection = () => Http.get("");

export const updateRepository = () => Http.get("");

export const updateQuestion = () => Http.get("");

export const updateAccount = () => Http.get("");

//




