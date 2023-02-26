import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id:number
    quantity:number
}

type ShoppingCartContext = {
    openCart:()=>void,
    closeCart:()=>void,
    cartQuantity: number,
    cartItems:CartItem[],
    getItemQuantity : (id: number) => number
    increaseCartQuantity : (id: number) => void
    decreaseCartQuantity : (id: number) => void
    removeFormCart : (id: number) => void
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id:number){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null ){
                return [...currItems, {id, quantity:1}]
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return {...item, quantity:item.quantity+1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id:number){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1 ){
                return [...currItems, {id, quantity:1}]
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return {...item, quantity:item.quantity-1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    function removeFormCart(id:number){
        setCartItems(currItems =>{
            return currItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider 
        value={{
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity,
            removeFormCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart}}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
}