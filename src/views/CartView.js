import { useSelector } from "react-redux";
import { delCart, getAllCart, getTotalCart, updateCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { utility } from '../shared/utility';


export function CartView() {

    const cart = useSelector( getAllCart() );

    const dispatch = useDispatch();

    const delCartHandler = (el) => {
        dispatch(delCart(el.id));
    }

    const updateCartHandler = (el, event) => {
            dispatch(updateCart({product: el, qty: event.target.value}));
    }

    const total = useSelector( getTotalCart() )

    return (
        <div>
          <h1>Carrello</h1>

          <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cancella</th>
                        <th scope="col">Immagine</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Prezzo</th>
                        <th scope="col">Qnt</th>
                        <th scope="col">Totale</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        cart.map ((el, index) => {
                            return (
                                <tr key={el.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td><button className="btn btn-danger" onClick={ () => delCartHandler(el)}>Cancella</button></td>
                                    <td><img className="card-img-top" src={el.image} alt={el.title}/></td>
                                    <td>{el.title}</td>
                                    <td>{utility.formatPrice(el.price)}€</td>
                                    <td>
                                        <input type="number" value={el.qty} onChange={ ($event) => updateCartHandler(el, $event) }/>
                                    </td>
                                    <td>{utility.formatPrice(el.qty * el.price)}€</td>
                                </tr>
                            )
                        })
                    }
        
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan="6"></td>
                        <td>{utility.formatPrice(total)}€</td>
                    </tr>
                </tfoot>

            </table>
        </div>

    )
}