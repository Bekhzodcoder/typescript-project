import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from '../data/items.json';
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number,
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFormCart } = useShoppingCart();
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
            <div className="me-auto">
                <div>
                    {item.name}
                    {" "}
                    {quantity > 1 && <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        {quantity}x</span>
                    }
                </div>
                <div style={{fontSize:".75rem"}} className="text-muted">{formatCurrency(item.price)}</div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button onClick={()=>removeFormCart(item.id)} className="outline-danger" >&times;</Button>
        </Stack>
    )
}