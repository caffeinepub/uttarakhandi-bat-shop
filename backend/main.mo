import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

actor {
  type Bat = {
    id : Nat;
    name : Text;
    description : Text;
    image : Text;
    price : Nat;
  };

  type CartItem = {
    bat : Bat;
    quantity : Nat;
  };

  type Order = {
    customerName : Text;
    address : Text;
    phone : Text;
    items : [CartItem];
    total : Nat;
  };

  module CartItem {
    public func compare(a : CartItem, b : CartItem) : Order.Order {
      Nat.compare(a.bat.id, b.bat.id);
    };
  };

  let bats = Map.empty<Nat, Bat>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let orders = List.empty<Order>();
  var nextBatId = 0;

  public shared ({ caller }) func addBat(name : Text, description : Text, image : Text, price : Nat) : async Nat {
    let id = nextBatId;
    nextBatId += 1;
    let bat : Bat = {
      id;
      name;
      description;
      image;
      price;
    };
    bats.add(id, bat);
    id;
  };

  public query ({ caller }) func getBats() : async [Bat] {
    bats.values().toArray();
  };

  public shared ({ caller }) func addToCart(batId : Nat, quantity : Nat) : async () {
    let bat = switch (bats.get(batId)) {
      case (null) { Runtime.trap("Bat not found") };
      case (?bat) { bat };
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?cart) { cart };
    };

    let cartItem : CartItem = {
      bat;
      quantity;
    };

    cart.add(cartItem);
    carts.add(caller, cart);
  };

  public query ({ caller }) func viewCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) {
        cart.toArray().sort();
      };
    };
  };

  public shared ({ caller }) func checkout(customerName : Text, address : Text, phone : Text) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    let itemsArray = cart.toArray();
    let total = itemsArray.foldLeft(
      0,
      func(acc, item) { acc + (item.bat.price * item.quantity) },
    );

    let order : Order = {
      customerName;
      address;
      phone;
      items = itemsArray;
      total;
    };

    orders.add(order);
    carts.remove(caller);
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orders.toArray();
  };
};
