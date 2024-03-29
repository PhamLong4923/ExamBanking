import Http from "./Http";

//account-api

export const useGoogle = (token) => Http.post("/GoogleAuth/save-jwt-data", token);

export const signUp = () => Http.post("");

export const login = () => Http.post("");

//get-api

export const getBank = () => Http.get("/Bank/GetBank");

export const getSection = (repoid) => Http.get(`/Section/listSection?repoid=${repoid}`);

export const getRepository = (bankid) => Http.post("/Repositories/GetRepo", bankid);

export const getQuestions = (secid) => Http.get(`/Question/listQuestion?sectionid=${secid}`);

export const getQuestionType = () => Http.get();

export const getQuestionMode = () => Http.get();

//create-api

export const addBank = (data) => Http.post("/Bank/CreateBank", data);

export const addSection = (data) => Http.post("/Section/CreateSection", data);

export const addRepository = (data) => Http.post("/Repositories/CreateRepo", data);

export const addQuestion = (data) => Http.post("Question/CreateQuestion", data);

//delete-api

export const delBank = (bankid) => Http.delete(`/Bank/DeleteBank?bankid=${bankid}`);

export const delSection = (secid) => Http.delete(`/Section/DeleteSection?secid=${secid}`);

export const delRepository = (repoid) => Http.delete(`/Repositories/DelRepo?repoid=${repoid}`);

export const delQuestions = () => Http.get("");

//update-api

export const updateBank = (bankid, newname) => Http.put(`/Bank/EditBank?bankid=${bankid}&newname=${newname}`);

export const updateSection = (secid, newname) => Http.put(`/Section/EditSection?secid=${secid}&newname=${newname}`);

export const updateRepository = (repoid, newname) => Http.put(`/Repositories/EditRepo?repoid=${repoid}&newname=${newname}`);

export const updateQuestion = () => Http.get("");

export const updateAccount = () => Http.get("");

//




