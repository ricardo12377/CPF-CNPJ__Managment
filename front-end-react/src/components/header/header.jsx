import style from "./style.module.css"

export default function Header() {
  return (
    <header className={style.tittle}  data-testid="header-element">
      <div>CPF & CNPJ Managment</div>
    </header>
  )
}