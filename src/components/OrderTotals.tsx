import { useMemo } from "react"
import { formatCurrency } from "../helpers"
import { OrderItem } from "../types"

type OrderTotalsProp = {
    order: OrderItem[],
    tip: number,
    placeOrder: ()=> void
}

export default function OrderTotals({order,tip, placeOrder} : OrderTotalsProp) {

   //Se calculara el valor cuando order sufra algun cambio 
   const subtotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0) , [order])
   const tipAmount = useMemo(() => subtotalAmount * tip,[subtotalAmount, tip])
   const totalAmount = useMemo(() => subtotalAmount + tipAmount,[subtotalAmount, tipAmount])

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina</h2>
            <p>SubTotal a Pagar: {' '}
                <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
            </p>
            <p>Propina: {' '}
                <span className="font-bold">{ formatCurrency(tipAmount)}</span>
            </p>
            <p>Total a Pagar: {' '}
                <span className="font-bold">{ formatCurrency(totalAmount)}</span>
            </p>
        </div>
        <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled={ totalAmount === 0 }
            onClick={placeOrder}
        >
            Guardar Orden
        </button>
    </>
  )
}
