
import { Navigation } from "../components/Navigation";



const ResponsiveNavbar = () => {
  return (
    <div>
        <ul>
            {Navigation.map((nav) => {
                return <li>{nav.title}</li>
            })}
        </ul>
    </div>
  )
}

export default ResponsiveNavbar