"use client"

import { currencyFormatter } from '@/app/lib/utils';
import ExpenseCategoryItem from "@/app/components/ExpenseCategoryItem";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Modal from "./components/Modal";
import { useState, useRef, useEffect } from 'react';
import { db } from "@/app/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"

// icons

import { FaRegTrashAlt } from 'react-icons/fa'

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
  const [income, setIncome] = useState([])
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  // Handler Functions --------------------------------

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: parseFloat(amountRef.current.value),
      description: descriptionRef.current.value,
      createdAt: new Date(),
    }

    const collectionRef = collection(db, 'income');

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      setIncome(prevState => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          }
        ]
      });

    }
    catch (error) {
      console.error("Error adding document: ", error.message);
    }

  };


  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = await doc(db, 'income', incomeId)

    try {
      await deleteDoc(docRef);
      setIncome((prevState) => { return prevState.filter((i) => i.id !== incomeId) });
    } catch (error) {
      console.error("Error deleting document: ", error.message);
    }
  }

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        }
      });

      setIncome(data)
    };
    getIncomeData();
  }, [])

  return (
    <>
      {/* Add income Modal */}

      <Modal showModal={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form className='input-group' onSubmit={addIncomeHandler}>
          <div className='input-group'>
            <label htmlFor='amount'>Valor</label>
            <input ref={amountRef} name="amount" type='number' min={0.00} step={0.01} placeholder='Insira o valor do recebimento' required />

            <label htmlFor='description'>Descrição</label>
            <input ref={descriptionRef} name="description" type='text' placeholder='Insira uma descrição' required />
          </div>
          <button type="submit" className="btn btn-primary bg-green-600 text-white">Adicionar</button>
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h3 className='text-2xl font-bold text-slate-900'>Histórico de recebimentos</h3>
          {income.map(i => {
            return (
              <div className='flex items-center justify-between' key={i.id}>
                <div>
                  <div className="font-semibold">{i.description}</div>
                  <small className='text-xs'>{i.createdAt.toISOString()}</small>

                </div>
                <p className="flex items-center gap-2">{currencyFormatter(i.amount)}
                  <button onClick={() => { deleteIncomeEntryHandler(i.id) }}>
                    <FaRegTrashAlt />

                  </button>
                </p>
              </div>
            )
          })}
        </div>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-slate-900 text-md">Meu saldo</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(15890)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => { }} className="btn btn-expenses">+ despesa</button>
          <button onClick={() => { setShowAddIncomeModal(true) }} className="btn btn-income">+ recebimento</button>
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
