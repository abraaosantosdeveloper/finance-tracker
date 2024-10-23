import Image from 'next/image';
import close from '@/app/images/close.png';


function Modal({showModal, onClose, children}) {

    return (
        <div style={{ transform: showModal ? "translateX(0%)" : "translateX(-200%)" }} className='absolute top-10 left-0 w-full h-full z-10 transition-all duration-500'>
            <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-400 py-6 px-4">
                <button onClick={() => { onClose(false) }} className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-500 text-white flex items-center justify-center"><Image src={close} width={10} height={10} /></button>
                {children}
            </div>
        </div>
    );
}

export default Modal;