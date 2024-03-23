import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObject: ListItem): void;
    removeItem(id: string): void;
}

export default class FullList implements List {
    static instance: FullList = new FullList();
    private constructor(private _list: ListItem[] = []) {}
    get list(): ListItem[] {
        return this._list;
    }
    load(): void {
        const storeList: string | null = localStorage.getItem("myList");
        if (typeof storeList !== "string") return;
        const parsedList: { _id: string; _item: string; _checked: boolean }[] = JSON.parse(storeList);
        parsedList.forEach((itemObj) => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newListItem);
        });
    }
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }
    clearList(): void {
        this._list = [];
        this.save();
    }
    addItem(itemObject: ListItem): void {
        this._list.push(itemObject);
        this.save();
    }
    removeItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        this.save();
    }
}
