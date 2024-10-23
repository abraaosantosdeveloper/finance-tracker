import { currencyFormatter } from "@/app/lib/utils"

function ExpenseCategoryItem({ color, title, total }) {
    return (
        <button>
            <div className="flex items-center justify-between py-4 px-4 bg-slate-400 rounded-xl">
                <div className="flex items-center gap-2">
                    <div className='w-[20px] h-[20px] rounded-full' style={{ backgroundColor: color }} />
                    <h4 className='capitalize'>{title}</h4>
                </div>
                <p>{currencyFormatter(total)}</p>
            </div>
        </button>

    )
}

export default ExpenseCategoryItem;