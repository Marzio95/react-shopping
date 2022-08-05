import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategoryIdByName } from '../slices/categoriesSlice';
import { useDispatch } from 'react-redux';
import { loadProducts } from '../slices/productsSlice';
import { addCart, getAllCart } from '../slices/cartSlice';

export function CategoryView() {

    const { category } = useParams();  // prende il parametro category dalla url, ma lo prendo con il destrutturing dell'oggetto:
                                      // useParams() mi ritorna un oggetto che io destrutturo subito 
                                     // cioè se ho un oggetto e voglio direttament una sua proprità
                                    // cioè metto dentro le parentesi {} il nome della proprietà

    const categoryId = useSelector(getCategoryIdByName(category));
    const products = useSelector(state => state.products.data);
    const cart = useSelector( getAllCart() )
    
    const dispatch = useDispatch();

    useEffect ( () => {
        dispatch( loadProducts(categoryId) );
    }, [dispatch, categoryId]);

    const addCartHandeler = (prod) => {
        dispatch(addCart(prod));
    }

    const productInCart = (product) => {
        const index = cart.findIndex(el => el.product_id === product.id);
        return index >= 0 ? true : false;
    }

    return (
        <div>
            <h1>{category.toUpperCase()} + {categoryId}</h1>
            <div className='d-flex justify-content-around flex-wrap'>
                {
                    products.map(product => {

                        let btn;
                        if (productInCart(product)) {
                            btn = 'Prodotto nel carrello'
                        } else {
                            btn = (<button className="btn btn-primary" onClick={() => addCartHandeler(product)}>Aggiungi al carrello</button>)

                        }

                        return (
                            <div className="card m-2" style={{'width': '18rem'}} key={product.id}>
                                <img className="card-img-top" src={product.image} alt={product.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <div>{btn}</div>
                                </div>
                          </div>
                        )
                    })
                }
            </div>
        </div>
    )
}