import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    bat: Bat;
    quantity: bigint;
}
export interface Bat {
    id: bigint;
    name: string;
    description: string;
    image: string;
    price: bigint;
}
export interface Order {
    customerName: string;
    total: bigint;
    address: string;
    phone: string;
    items: Array<CartItem>;
}
export interface backendInterface {
    addBat(name: string, description: string, image: string, price: bigint): Promise<bigint>;
    addToCart(batId: bigint, quantity: bigint): Promise<void>;
    checkout(customerName: string, address: string, phone: string): Promise<void>;
    getBats(): Promise<Array<Bat>>;
    getOrders(): Promise<Array<Order>>;
    viewCart(): Promise<Array<CartItem>>;
}
