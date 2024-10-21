import { currencyFormatter } from '@/app/lib/utils';
import ExpenseCategoryItem from "@/app/components/ExpenseCategoryItem";

const DUMMY_DATA = [
  {
    id: 1,
    title: 'Alimentação',
    amount: 1234.56,
    color:"#9b5fe0"
  },
  {
    id: 2,
    title: 'Eletrônicos',
    amount: 499.11,
    color:"#d64e12"
  },
  {
    id: 3,
    title: 'Faculdade',
    amount: 1999.10,
    color:"#8bd346"
  },
  {
    id: 4,
    title: 'Assinaturas',
    amount: 1234.00,
    color:"#f9a52c"
  },
]


export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-slate-900 text-md">Meu saldo</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(15890)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-expenses">+ despesa</button>
        <button className="btn btn-income">+ receita</button>
      </section>

      { /* Expenses */}

      <section className="py-3">
        <h3 className="text-2xl">Meus gastos</h3>
        <div className="flex flex-col gap-4 mt-2">
        {DUMMY_DATA.map((expense) => {
          return (
            <ExpenseCategoryItem key={expense.id} color={expense.color} title={expense.title} amount={expense.amount}/>
          )
        })}
        </div>

      </section>
    </main>
  );
}
