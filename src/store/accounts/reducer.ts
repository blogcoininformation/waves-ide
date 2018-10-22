import {ActionType, getType} from 'typesafe-actions';
import * as accounts from './actions'

const defaultState: IAccountsState = {
    accounts: [
        {
            seed: 'industry unable prison quantum cram toast produce panda slow position coffee energy awesome route quarter',
            label: 'Account 1'
        }
    ],
    selectedAccount: 0
}

interface IAccount {
    seed: string
    label: string
}

export interface IAccountsState {
    accounts: IAccount[]
    selectedAccount: number
}

export type AccountsAction = ActionType<typeof accounts>;

export default (state: IAccountsState = defaultState, action: AccountsAction): IAccountsState => {
    switch (action.type) {
        case getType(accounts.addAccount):
            return {
                ...state,
                selectedAccount: state.accounts.length,
                accounts: state.accounts.concat({
                    label: `Account ${state.accounts.length + 1}`,
                    seed: action.payload
                })
            };
        case getType(accounts.selectAccount):
            return {
                ...state,
                selectedAccount: action.payload
            };
        case getType(accounts.removeAccount):
            return {
                ...state,
                selectedAccount: action.payload >= state.accounts.length - 1 ? state.accounts.length - 1 : action.payload,
                accounts: [
                    ...state.accounts.slice(0, action.payload),
                    ...state.accounts.slice(action.payload + 1)
                ]
            };
        case getType(accounts.setAccountLabel):
            const {label, index} = action.payload
            return {
                ...state,
                accounts: [
                    ...state.accounts.slice(0, index),
                    {
                        ...state.accounts[index],
                        label
                    },
                    ...state.accounts.slice(index + 1)
                ]
            };
        case getType(accounts.setAccountSeed):
            const {seed, index: i } = action.payload
            return {
                ...state,
                accounts: [
                    ...state.accounts.slice(0, i),
                    {
                        ...state.accounts[i],
                        seed
                    },
                    ...state.accounts.slice(i + 1)
                ]
            };
        default:
            return state
    }
}