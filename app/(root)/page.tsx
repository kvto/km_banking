import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: "Adrian", lastName: "Montero", email: "kjmz.15987@gmail.com" }
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest"}
          subtext="Accede y maneja tu cuenta y transcciones eficiente"/>

          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35}/>
        </header>

        RECENT TRANSACITONS
      </div>

      <RightSidebar
      user={loggedIn}
      transactions={[]}
      banks={[{}, {}]} />
    </section>
  )
}

export default Home