const carrito = document.querySelector('#carrito');
const templateLista = document.querySelector('#templateLista');
const templateFooter = document.querySelector('#templateFooter');
const botones = document.querySelectorAll('.card .btn');
const fragment = document.createDocumentFragment();
const footer = document.querySelector('#footer');

document.addEventListener('click', (e)=>{
    if(e.target.matches('.card .btn-outline-primary')){
        agregarProducto(e);
    }
    if(e.target.matches('.boton .btn-success')){
        agregarCantidad(e);
    }
    if(e.target.matches('.boton .btn-danger')){
        quitarCantidad(e);
    }
});


let carritoObjeto=[];

const agregarProducto = (e)=> {
    const producto = {
        nombre: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
        subTotal: parseInt(e.target.dataset.precio)
    }
    //!busca el indice si lo encuentra le suma 1 y suma el precio
    const index = carritoObjeto.findIndex((productoId)=>productoId.id === producto.id);
    
    if (index === -1){
        carritoObjeto.push(producto);
    } else {
        carritoObjeto[index].cantidad ++;
        carritoObjeto[index].subTotal = carritoObjeto[index].precio * carritoObjeto[index].cantidad;
    }
    pintarProducto();
}

const pintarProducto = ()=>{
    carrito.textContent = '';
    carritoObjeto.forEach(producto => {
        // console.log(producto)
        const clone = templateLista.content.cloneNode(true);
        // console.log(clone);
        
        //Seleccionamos la clases a modificar interactivamente
        clone.querySelector('.lead').textContent = producto.nombre;
        clone.querySelector('.badge').textContent = producto.cantidad;
        clone.querySelector('.subTotal .spanSubTotal').textContent = (producto.subTotal).toFixed(2);
        //Agregamos un dataset a los botones
        clone.querySelector('.btn-success').dataset.id = producto.id
        clone.querySelector('.btn-danger').dataset.id = producto.id

        fragment.appendChild(clone);                
        
    });

    carrito.appendChild(fragment);
    // const total = carrito.reduce()
    pintarFooter();
}

const pintarFooter = ()=>{
    footer.textContent = '';
    if(carritoObjeto.length > 0 ){

        let total=0;
        total = carritoObjeto.reduce((acc,current) =>{
            return acc = acc + current.subTotal
        },0);
        
        const cloneFooter = templateFooter.content.firstElementChild.cloneNode(true);
        
        cloneFooter.querySelector('.card .lead span').textContent = total.toFixed(2);
    
        footer.appendChild(cloneFooter); 
    }
}

const agregarCantidad =(e)=>{
    carritoObjeto = carritoObjeto.map((item)=>{
        if(item.id === e.target.dataset.id){
            item.cantidad ++;
            item.subTotal = item.cantidad * item.precio;
        }
        return item
    });
    pintarProducto();
}

const quitarCantidad = (e)=>{
    carritoObjeto = carritoObjeto.filter((item)=>{
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad --;
                item.subTotal = item.cantidad * item.precio;
                if (item.cantidad === 0) return;
                return item;
            }
        } else { 
            return item; 
        }
    });
    pintarProducto();
}