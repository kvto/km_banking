import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';

import React from 'react'
import RecentTransactions from '@/components/RecentTransactions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const currentPage = Number(page as string) || 1;
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Bienvenido"
          user={loggedIn?.firstName || "Guest"}
          subtext="Accede y maneja tu cuenta y transcciones eficiente"/>

          <TotalBalanceBox
          accounts={accountsData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}/>
        </header>

        <RecentTransactions 
        accounts={accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage}/>
      </div>

      <RightSidebar
      user={loggedIn}
      transactions={account?.transactions}
      banks={accountsData?.slice(0, 2)} />
    </section>
  )
}

export default Home