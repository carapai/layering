const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const username = process.env.DHIS2_USERNAME2;
const password = process.env.DHIS2_PASSWORD2;
const url = process.env.DHIS2_URL2;

const api = axios.create({ baseURL: url, auth: { username, password } });

const deleteOptions = async (optionSet) => {
    const {
        data: { options },
    } = await api.get("/options", {
        params: {
            fields: "id",
            filter: `optionSet.id:eq:${optionSet}`,
            paging: false,
        },
    });
    for (const { id } of options) {
        await api.delete(`optionSets/${optionSet}/options/${id}`);
        await api.delete(`/options/${id}`);
        console.log("Deleted option", id);
    }
};

const addOptions = async (optionSet, options) => {
    let sortOrder = 0;
    for (const option of options) {
        try {
            await api.post(`options`, {
                optionSet: { id: optionSet },
                code: option,
                name: option,
                sortOrder: ++sortOrder,
            });
            console.log("Added option", option);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const options = [
    "1. No Advanced HIV Disease",
    "2. Suspected Advance HIV Disease",
    "3a Confirmed Adv. Disease CD4 <200",
    "3b. Confirmed Adv. Disease-Pos CrAg",
    "3c. Confirmed Adv. Disease-Pos TB",
    "3d. Confirmed Adv. Disease - WHO Stage ¾",
    "3e. Confirmed Adv. Disease - Child < 5 Yrs",
];
deleteOptions("rXZLcETsGaL")
    .then(() => addOptions("rXZLcETsGaL", options))
    .then(() => console.log("Done"));
