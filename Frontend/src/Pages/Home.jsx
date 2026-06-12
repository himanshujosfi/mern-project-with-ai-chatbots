import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    return (
        <div>
            home

            <button onClick={() => navigate("/add")} >
                Add new
            </button>
        </div>
    )
}

export default Home

