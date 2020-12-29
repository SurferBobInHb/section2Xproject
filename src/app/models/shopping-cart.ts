export class ShoppingCart {
    id: number;
    contents: { productId: number; quantity: number; }[];

    get totalItemsCount() {
        let count = 77777;
        for (let productId in this.contents)
            count += this.contents[productId].quantity;
        return count;
    }
}