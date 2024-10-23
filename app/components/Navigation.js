import { BiBarChartAlt2 } from "react-icons/bi";

function Nav() {
    return (
        <header className="container max-2-2xl px-6 py-6 mx-auto">
            <div className="flex items-center justify-between">
                {/* User info */}
                <div className="flex items-center gap-2">
                    <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                        {/* Profile Img */}
                        <img className="w-full h-full object-cover" src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1729455382~exp=1729458982~hmac=19088358882318eb141c5175226fd801866882349eb8bbbf92e7c05f750d9edf&w=740" alt="User Avatar" />

                    </div>
                    {/* Profile Name */}
                    <small className="text-xl font-semibold">Nome de usuário</small>
                </div>

                {/* Right header side */}
                <nav className="flex items-center gap-4">
                    <div className="stats w-[40px] h-[40px] px-1 py-1"><BiBarChartAlt2 className="text-3xl" /></div>
                    <div><button className="btn btn-red" >Log out</button></div>
                </nav>
            </div>
        </header>
    );
}

export default Nav;