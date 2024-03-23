import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import { v4 as uuidv4 } from "uuid";
import ListTemplate from "./template/ListTemplate";

const initApp = (): void => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
    itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
        e.preventDefault();

        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText = input.value.trim();
        if (!newEntryText.length) return;

        const itemId = uuidv4();
        const newItem = new ListItem(itemId, newEntryText);

        fullList.addItem(newItem);

        template.render(fullList);
        input.value = "";
    });

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
    clearItems.addEventListener("click", (): void => {
        fullList.clearList();
        template.clear();
    });
    fullList.load();
    template.render(fullList);
};
document.addEventListener("DOMContentLoaded", initApp);
