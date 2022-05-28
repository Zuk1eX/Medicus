<template>
    <div class="faq__spoilers-container">
        <div class="faq__spoilers">
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">
                        Пользовалась подобными сервисами-агрегаторами, чем Medicus лучше остальных?
                    </h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Не спорим, другие сервисы-агрегаторы лекарственных средств и прочих аптечных товаров
                        предоставляют похожий функционал, но вместе с ним и кучу бесполезной информации, отвлекающей во
                        время работы с ним.
                    </p>
                    <p>
                        Medicus ставит во внимание прежде всего удобство и быстроту поиска самой лучшей цены на
                        лекарства в аптеках города. Поэтому в процессе работы с ним вы не столкнетесь с рекламными
                        баннерами, предложениями новых медикаментов и т.п. А если врач выписал Вам рецепт как всегда
                        непонятным почерком и Вы еле разбираете символы — благодаря нашей усовершенствованной технологии
                        поиска найдется всё!
                    </p>
                    <p>
                        Помимо этого, нашим сервисом можно полноценно пользоваться без регистрации, а также добавлять
                        лекарства и аптеки в избранное для быстрого доступа.
                    </p>
                    <p>
                        Удобный, интуитивно понятный и минималистичный дизайн является приятным бонусом ко всем функциям
                        сервиса. Наслаждайтесь!
                    </p>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Что я могу сделать на сервисе?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Не спорим, другие сервисы-агрегаторы лекарственных средств и прочих аптечных товаров
                        предоставляют похожий функционал, но вместе с ним и кучу бесполезной информации, отвлекающей во
                        время работы с ним.
                    </p>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Что такое аналоги лекарственных средств?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>Функционал сервиса Medicus сравним с конкурентными ему. Вам доступны следующие функции:</p>
                    <ul>
                        <li>поиск лекарственных средств по наименованию или штрих-коду;</li>
                        <li>получение справочной информации о лекарственных средствах;</li>
                        <li>получение актуальных сведений об остатках лекарственных средств в аптеках;</li>
                        <li>
                            возможность просмотра всех форм выпуска лекарственных средств, а также их аналогов и
                            синонимов;
                        </li>
                        <li>сортировка лекарственных средств по различным критериям;</li>
                        <li>фильтрация сведений об остатках лекарственных средств по различным критериям;</li>
                        <li>получение контактной информации об аптечных учреждениях;</li>
                        <li>управление списком избранных медикаментов и аптек;</li>
                        <li>просмотр истории просмотра лекарственных средств.</li>
                    </ul>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">
                        Можно ли фильтровать остатки лекарства в аптеках по нескольким параметрам?
                    </h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Конечно, можно комбинировать различые фильтры и получать необходимую выборку остатков лекарства.
                        Сервис позволяет осуществлять фильтрацию по таким параметрам, как:
                    </p>
                    <ul>
                        <li>диапазон цен;</li>
                        <li>цена со скидкой;</li>
                        <li>круглосуточные аптеки;</li>
                        <li>станции метро;</li>
                        <li>название аптечной сети.</li>
                    </ul>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Планируется ли дальнейшее развитие сервиса?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Несомненно, есть еще много аспектов и функциональных фишек, нереализованных на текущий момент.
                        Но команда разработки уже вовсю работает над дальнейшими улучшениями сервиса Medicus, чтобы Вам
                        было еще удобнее пользоваться им.
                    </p>
                    <p>На текущий момент уже ведется работа над следующими возможностями сервиса:</p>
                    <ul>
                        <li>
                            адаптивное отображение на различных устройствах, чтобы Вы могли с комфортом пользоваться
                            Medicus на своем смартфоне;
                        </li>
                        <li>
                            система аккаунтов, чтобы Вы могли синхронизировать списки избранных лекарств и аптек, а
                            также историю запросов и просмотров товаров на всех Ваших устройствах;
                        </li>
                        <li>
                            категории аптечных товаров, болезни, более подробное описание каждого лекарственного
                            средства.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="faq__spoilers">
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Где можно увидеть историю просмотренных мною лекарств?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Вы можете просмотреть историю лекарств, страницы которых вы посещали, воспользовавшись крайней
                        правой кнопкой в шапке сервиса.
                    </p>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Как добавить лекарство или аптеку в избранное?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        При просмотре страниц, на которых размещены карточки лекарств или его подробное описание,
                        нажмите на кнопку “с сердечком” — Вы добавили лекарство в избранное. Аптеки можно пометить таким
                        же образом на страницах остатков лекарств и ассортимента аптеки.
                    </p>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Что такое синонимы лекарственных средств?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Понятие синонимичных лекарственных средств основано на использовании одинаковых МНН, указанных
                        на страницах лекарств.
                    </p>
                    <p>
                        Международное непатентованное название (МНН) — уникальное название действующего вещества
                        лекарственного средства, рекомендованное Всемирной организацией здравоохранения (ВОЗ). Оно
                        присваивается одиночным, чётко определимым веществам, которые можно охарактеризовать химической
                        номенклатурой или формулой.
                    </p>
                    <p>
                        Медикаменты, имеющие одинаковое МНН, являются абсолютно взаимозаменяемыми и называются
                        СИНОНИМАМИ.
                    </p>
                    <p>Вы можете самостоятельно выбирать медикамент из списка синонимов.</p>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Есть ли возможность поиска по штрих-коду?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Да, просто вводите штрих-код полностью в формате 13 цифр в поисковую строку, и в оверлее с
                        результатами поиска Вы увидите искомый аптечный товар.
                    </p>
                </div>
            </div>
            <div class="faq__spoiler">
                <div class="spoiler__top" @click="toggleSpoiler($event)">
                    <h4 class="spoiler__title">Почему при поиске лекарства выдается только 5 результатов?</h4>
                    <img class="spoiler-icon" :src="require('@/assets/icons/arrow-spoiler.svg')" alt="" />
                </div>
                <div class="spoiler__text">
                    <p>
                        Действительно, использование оверлея для просмотра результатов поиска лекарства ограничивает Вас
                        лишь 5-ю карточками. Чтобы просмотреть все найденные по запросу медикаменты, нажмите на кнопку
                        Найти и Вы перейдете на страницу всех результатов поиска.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        toggleSpoiler(event) {
            event.currentTarget.querySelector(".spoiler-icon").classList.toggle("spoiler-icon--active");
            event.currentTarget.nextElementSibling.classList.toggle("spoiler__text--active");
        },
    },
};
</script>
<style lang="css">
.faq__spoilers-container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

.faq__spoilers {
    display: flex;
    flex-direction: column;
    gap: 30px;
    flex: 50%;
}

.faq__spoiler {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 16px;
}

.spoiler__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.spoiler__title {
    font-size: 20px;
    line-height: 125%;
    position: relative;
}

.spoiler-icon {
    margin-left: 15px;
    transition: all 0.2s ease;
}

.spoiler-icon--active {
    transform: rotateX(180deg);
}

.spoiler__text {
    display: none;
}

.spoiler__text--active {
    display: block;
}

.spoiler__text p,
.spoiler__text li {
    font-size: 18px;
    line-height: 125%;
    color: #6f6f6f;
}

.spoiler__text p + p {
    margin-top: 1em;
}
</style>