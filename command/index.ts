
import { WidgetsFactory, DataLoaderFactory, CommandOptions } from "@itsy-ui/core";
import { AsyncStorage } from 'react-native';

const dataLoader = WidgetsFactory.instance.services["DataLoaderFactory"] as DataLoaderFactory;
const commandManager: any = dataLoader.getLoader("commandManager");

const addToCart: CommandOptions<any> = {
	canExecute: (data: any) => {
		return true;
	},
	execute: async (data: any, transition: (data: any) => void) => {
		const cartData = await AsyncStorage.getItem("cart");
		const cartItems = cartData ? JSON.parse(cartData) : {};
		cartItems[data] = true;
		AsyncStorage.setItem("cart", JSON.stringify(cartItems));
	}
}
commandManager.registerCommand("add_cart", {}, addToCart);


const deleteFromCart: CommandOptions<any> = {
	canExecute: (data: any) => {
		return true;
	},
	execute: async (data: any, transition: (data: any) => void) => {
		const cartData = await AsyncStorage.getItem("cart");
		const cartItems = cartData ? JSON.parse(cartData) : {};
		const { controlID, record } = data;

		delete cartItems[record.id];
		AsyncStorage.setItem("cart", JSON.stringify(cartItems));

		transition({
			controlID,
			strict: true,
			type: "GRID_REFRESH",
		});
	}
}
commandManager.registerCommand("remove_item", {}, deleteFromCart);

const checkout: CommandOptions<any> = {
	canExecute: (data: any) => {
		return true;
	},
	execute: async (data: any, transition: (data: any) => void) => {
		await AsyncStorage.setItem("cart", "{}");
		transition({
			type: "NAVIGATE_URL",
			url: `success`,
		});
	}
}
commandManager.registerCommand("checkout", {}, checkout);