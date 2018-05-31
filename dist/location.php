<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/style.min.css">
    <title>Location</title>
</head>
<body>
    <?php include_once('includes/header.php');?>
    <!-- architecture -->
        <section class="location">

            <div class="page-top page-top_location">
                <div class="page-top__wrapper">
                    <div class="page-top_heading">
                        <h1>Розташування</h1>
                        <div class="page-top__letter-w">
                        <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 170.1 132.4"><path d="M57.1 132.4L0 0h6.4l51.5 119.2L82 62.8 55.2 0h6.2l24.1 57.1L110.4 0h4.9L88.2 62.7l24.6 57.1L165.4 0h4.7l-57.8 132.4-27.6-63.5-27.6 63.5z"/></svg>
                        </div>
                    </div>
                    <div class="page-top__links">
                        <ul>
                            <li>
                                <a href="/">Головна</a>
                            </li>
                            <li>
                                <span class="page-top__line"></span>
                            </li>
                            <li>
                                <a href="#">Розташування</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- page-top -->

            <?/* Google API Account
                pass: La<x(Pg):T[2nt>)
                acc: washingtonovichwashington@gmail.com
                apikey: AIzaSyCkkNgvCFDLDhP_qSDZhMRyzOG8bZ3hJYs
            */?>

            <div class="info-block js-info-block info-block__location">
                <div class="info-block__main-content">
                    <div class="info-block__heading">
                        <h3>Унікальний образ</h3>
                    </div>
                    <div class="info-block__text">
                        <p class="info-block__paragraph">
                            Мешканці будинку можуть користуватися усіма перевагами життя у центрі, знаходячись не на виду у всіх. 
                        </p>
                        <p class="info-block__paragraph">
                            До ваших послуг – чималий вибір ресторанів, магазинів, розваг та місць для прогулянок. 
                            І що важливо, усе необхідне знаходиться у пішій доступності. Навіть до Хрещатику 
                            ви дістанетесь пішки – ця прогулянка займе не більше чверті години.
                        </p>
                    </div>
                </div>
                <div class="info-block__close js-info-block__close">
                    <i class="info-block__arrow"></i>
                </div>
            </div>

            <div class="map js-map"></div>

            <div class="location__time wrapper">
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">1 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до найближчого ресторану
                    </div>
                </div>
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">5 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до станції метро Олімпійська
                    </div>
                </div>
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">5 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до найближчого парку 
                    </div>
                </div>
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">5 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до найближчого ТРЦ
                    </div>
                </div>
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">5 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до Костелу Святого Миколая
                    </div>
                </div>
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">7 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до Київського театру оперети
                    </div>
                </div>
                <div class="location__itme-item">
                    <div class="time">
                        <span class="time__bold time__text">15 хв.</span><span class="time__text">пішки</span>
                    </div>
                    <div>
                        до Хрещатику
                    </div>
                </div>
            </div>

        </section>
    <?php include_once('includes/tab_forms.php');?>    
    <?php include_once('includes/footer.php');?>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkkNgvCFDLDhP_qSDZhMRyzOG8bZ3hJYs"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/common.min.js"></script>
<script src="js/location.min.js"></script>
</body>
</html>