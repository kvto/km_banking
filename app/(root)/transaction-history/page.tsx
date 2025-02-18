import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { formatAmount } from '@/lib/utils';
import TransactionsTable from '@/components/TransactionsTable';
import { Pagination } from '@/components/Pagination';

const TransactionHistory = async  ({ searchParams: {id, page}}: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const currentPage = Number(page as string) || 1;
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  const rowsPerPage = 10;
const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

const indexOfLastTransaction = currentPage * rowsPerPage;
const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

const currentTransactions = account?.transactions.slice(
  indexOfFirstTransaction, indexOfLastTransaction
)
  
  return (
    <div className="transactions">
        <div className="transactions-header">
        <HeaderBox 
        title= "Historial de transacciones"
        subtext="Mira los detalles y transacciones de su banco"/>
        </div>

        <div className="space-y-6">
          <div className="transactions-account">
            <div className="flex flex-col gap-2">
              <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
              <p className="text-14 text-blue-25">{account?.data.officialName}</p>
              <p className="text-14 font-semibold tracking-[1.1px] text-white">
                    ●●●● ●●● ●●●● ●●●● {account?.data.mask}
                </p>
            </div>
            
            <div className="transactions-account-balance">
                 <p className="text-14">Balance actual</p>
                 <p className="text-24 text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
            </div>
          </div>
          <section className="flex w-full flex-col gap-6">
          <TransactionsTable 
            transactions={currentTransactions}
          />
             {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={currentPage} />
              </div>
            )} 
        </section>
        </div>
    </div>
  )
}

export default TransactionHistory