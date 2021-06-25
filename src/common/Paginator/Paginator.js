import React, {useState} from "react";
import classes from './Paginator.module.css';
import cn from 'classnames';

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    // pagesCount - количество всех страниц
    // totalUsersCount - сколько всего пользователей
    // pageSize размер страницы
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    // создадим массив со страницыми, которые нужно отобразить
    let pages = [];
    // пробегаем по pagesCount.
    for (let i = 1; i <= pagesCount; i++) {
        // масив pages заполним .push значениями i
        pages.push(i);
    }
// отпределение границ
// количество всех страниц pagesCount разделили на размер порции portionSize. portionSize задаём в props
    let portionCount = Math.ceil(pagesCount / portionSize);
// используем huk useState
// со старта будем хранить первую порцию portionNumber. setPortionNumber - функция, которая portionNumber меняет
    let [portionNumber, setPortionNumber] = useState(1);
// определяем правую и левую границу
    let leftPortionPageNumber = (portionNumber -1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


// по pages можем пробежаться .map. внутри map приходит страничка
// если currentPage равна текущей странице p, то добавляется класс selectedPage
// рисуем страницы pages
    return <div className={classes.paginator}>
{/*добавляем дополнительные условия для отображения кнопки. Показывай кнопку влево, если portionNumber > 1*/}
        { portionNumber > 1 &&
            // внутри кнопки вешаем onClick и говорим установи setPortionNumber порция текущая - 1 (portionNumber - 1)
        <button onClick={ () => { setPortionNumber(portionNumber - 1) }}>PREV</button> }
        {pages
// перед отрисовкой страниц и .map сделаем фильтрацию с помощью .filter.
// Отрисуем только те страницы, фильтрация которых вернёт true
// нужно отрисовать >= левой границы порции (leftPortionPageNumber)
// <= правой границы порции rightPortionPageNumber
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            return <span className={ cn ({
                [classes.selectedPage]: currentPage === p
            }, classes.pageNumber) }
                         key={p}


                // хотим засетать CurrentPage. Итерируемся по p и она будет текущей страничкой
                // при нажатии на кнопку нужно поменять CurrentPage
                // обработчик событий аномимная функция. Кнопка вызовет функцию и передаст е
                // мы внутри обработчика вызовем наш метод this.onPageChanged(p) и передадим p
                // наш метод не вызовется, пока не вызовется анонимная функция. Анонимная функция вызовется при клике на span

                         onClick={(е) => {
                             onPageChanged(p);
                         }}>{p}</span>
        })}

            { portionCount > portionNumber &&
                // если стрелка показывается, то при клике на стрелку мы устанавливаем номер порции portionNumber на единицу больше
        <button onClick={ () => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }
    </div>
}

export default Paginator;