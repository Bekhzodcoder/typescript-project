import {Card, Button} from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import {useShoppingCart} from '../context/ShoppingCartContext';

type StoreItemProps ={
    id:number,
    name:string,
    price:number,
    imgUrl:string

}

export function StoreItem({id, name, price, imgUrl} : StoreItemProps){
    const {
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity,
            removeFormCart} = useShoppingCart()
    const quantity = getItemQuantity(id);
    return(
     <>
      <Card className="h-100" >
        <Card.Img variant={"top"} src={imgUrl} height="200px" style={{objectFit:"cover"}} />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baealine mb-4 ">
                <span className='fs-2'>{name}</span>
                <span className='ms-2 text-muted '>{formatCurrency(price)}</span>
            </Card.Title>
        </Card.Body>
        <div className="mt-auto">
            {quantity === 0 ? (
                <Button className="w-100" onClick={()=>increaseCartQuantity(id)}>+ Add to card</Button>
            ) : (
                <div className="d-flex align-items-center flex-column" style={{gap:".5rem"}}>
                    <div className="d-flex alig-items-center justify-content-center">
                        <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                        <div>
                            <span className="fs-3" >{quantity}</span> in to cart
                        </div>
                        <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                    </div>
                    <Button variant="danger" size="sm" onClick={()=>removeFormCart(id)} >Remove</Button>
                </div>
            )}
        </div>
      </Card>
     </>
    )
}