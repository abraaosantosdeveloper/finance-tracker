"use client"

import { currencyFormatter } from '@/app/lib/utils';
import ExpenseCategoryItem from "@/app/components/ExpenseCategoryItem";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Modal from "./components/Modal";
import { useState } from 'react';


ChartJs.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: 'Alimentação',
    total: 1234.56,
    color: "#9b5fe0"
  },
  {
    id: 2,
    title: 'Eletrônicos',
    total: 499.11,
    color: "#d64e12"
  },
  {
    id: 3,
    title: 'Faculdade',
    total: 1999.10,
    color: "#8bd346"
  },
  {
    id: 4,
    title: 'Assinaturas',
    total: 1234.00,
    color: "#f9a52c"
  },
  {
    id: 5,
    title: 'Outros',
    total: 678.90,
    color: "#f53d3d"
  }

]


export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {/* Modal */} 
      
      <Modal showModal={modalIsOpen} onClose={setModalIsOpen}><h3>Hello world</h3></Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-slate-900 text-md">Meu saldo</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(15890)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => {setModalIsOpen(true)}} className="btn btn-expenses">+ despesa</button>
          <button onClick={() => {setModalIsOpen(true)}} className="btn btn-income">+ receita</button>
        </section>

        { /* Expenses */}

        <section className="py-3">
          <h3 className="text-2xl">Meus gastos</h3>
          <div className="flex flex-col gap-4 mt-2">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseCategoryItem key={expense.id} color={expense.color} title={expense.title} total={expense.total} />
              )
            })}
          </div>

          {/*Chart Section */}

          <section className="py-6">
            <h3 className="text-2xl">Stats</h3>

            <div className='w-1/2 mx-auto'>
              <Doughnut data={{
                labels: DUMMY_DATA.map((expense => expense.title)), datasets: [
                  {
                    label: 'Expenses',
                    data: DUMMY_DATA.map((expense => expense.total)),
                    backgroundColor: DUMMY_DATA.map((expense => expense.color)),
                    bolderColor: DUMMY_DATA.map((expense => expense.color)),
                    borderWidth: 0
                  }
                ]
              }} />
            </div>


          </section>


        </section>
      </main>
    </>
  );
}
