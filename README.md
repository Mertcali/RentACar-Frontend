# Angular ile RentACar-Frontend 
## :mag:Başlarken

Web uygulamaları geliştirmek için kullandığımız, Google tarafından geliştirilen bir framework.

+ Visual Studio Code kullandık.
+ Nodejs 14.16.0 LTS kurulumu yaptık.
+ Angular cli kurulumu yaptık. (npm install -g @angular/cli)
+ Projemizi oluşturduk.
+ Bootstrap v5.0.0-beta3 kurduk.

## :scroll:Geliştirmeler

### 1. Veriler Api tarafından çekilmeye çalışıldı.

**Hiçbir güzelleştirme olmadan sadece api'den veriler çekmeye çalışıldı.
Sırasıyla markalar,renkler,müşteriler,arabalar,kiralamalar listelendi.**

+ Öncelikle çekmek istediğimiz veriler ve navbar için components klasörü oluşturuldu.
daha sonra models ve services klasörü oluşturuldu.

+ Verileri çekmek için (sadece brand'i düşünürsek)

*brand , brandResponseModel, responseModel* modelleri oluşturuldu.

+ Services klasörünün içinde
*brandService* oluşturuldu. HttpClient import edildi.(hem servis için hem app-module içinde(HttpClientModule))

+ Servis içerisinde apiUrl yolu belli edilerek *getBrands()* yazıldı.

+ brandComponent'te servis private tanımlanarak *getBrands()* çağırılıp subscribe olundu.
html'de bir ngFor ile basit şekilde veriler gösteriliyor mu test edildi.

app.component.html'de yazılan

    <div class="container">
     <app-navi></app-navi>
     <div class="row">
        <div class="col-md-2">
         <app-brand></app-brand>
         <br>
          <app-customer></app-customer>
       </div>
       <div class="col-md-10">
         <app-cardetail></app-cardetail>
        </div>
     </div>
     <div class="row">
        <div class="col-md-2">
         <app-color></app-color>
        </div>
        <div class="col-md-10">
         <app-rental></app-rental>
        </div>
     </div>
    </div>
    <router-outlet></router-outlet>


şeklinde bir html'in nasıl yerler kaplayacağını belli etmek için bütün app'ler farklı renklendirildi. Bu renklendirme aşağıdaki şekilde:
![yenideneme](https://user-images.githubusercontent.com/77545922/112861095-27730480-90bd-11eb-8b1d-53e4a9c96f57.PNG)

### 2. Biraz Refactoring ve Resimlerin Getirilişi

**NOT: appcomponent.html'de router-outlet --> bir tarayıcıda link tarafında ..../'tan sonra şu gelirse şuraya git diye belli ettiğimiz yer burası.
Gideceği yerleri de app-routing.module'da belli ediyoruz.**

+ listResponseModel'lar oluşturulup diğer responseModel'lar silindi.

+ Sadece Brand için düşündüğümüz zaman brandcomponent.html için click event ve routeLink oluşturuldu.
bunun için cardetailservice'e *getbybrandid()* yazıldı
cardetailcomponent düzeltildi.

+ brand.component.html'de tüm araçlara basıldığında tüm araçların listelenmesi ve o butonun yanması için componente
*resetCurrentBrand(), getAllCarsClass()* eklendi.

Aynı işlemler color tarafında da gerçekleştirildi.

Basit bir şekilde giriş gerçekleştirdiğimiz için(sadece test olarak düşünülebilir) adım adım ilerliyoruz.
- Araç ve Color aynı anda seçildiğinde en son seçileni direkt gösteriyor ve diğer seçilen hala seçili gösteriyor.
- Tüm araçlar veya tüm renkler'e basıldığında diğer component'in butonları resetlenmiyor.
- Olmayan Renkler gösterilmeyecek. (Renklere çok takılmayın turuncu-yeşil gibi renkleri veritabanına rastgele doldurmuştum .:relieved:) 

![yenideneme2brandlist](https://user-images.githubusercontent.com/77545922/112862241-3a3a0900-90be-11eb-8bed-a27be5c5b9c5.PNG)

### 2.1 Resimlerin getirilişi

+ Bu projede resim getirme işlemini de cardetailcomponent üzerinden yapacağım. Servis'e *getImages() ve
getImagesById()* eklendi,
carDetailComponent'e yazıldı.

+ Resimlerin gelip gelmediğini test etmek için öncelikle carcomponent içinde bir değişken cardetail.imagePath
olarak denendi. ImagePath geliyordu. 

+ Resimlerin gösterilip gösterilmediğini test etmek için 
cardetailcomponent.html'e  aşağıdaki kodlar eklendi.

        <img src="https://mdbootstrap.com/img/Others/documentation/img%20(75)-mini.jpg" alt="thumbnail" class="img-thumbnail"
           style="width: 200px">

bu kod ile linkini koyduğunuz resmi basit bir şekilde gösterebilirsiniz. Detayları bootstrap'te var.

+ Bu kod ile componentimizde oluşturduğumuz carImages'i dönerek bütün resimleri getirmeye çalışıyoruz.
 
        <tr *ngFor="let images of carImages">
          <img src="{{imageBasePath}}{{images.imagePath}}" class="img-fluid" alt="...">
         </tr>
         
### :bangbang: Resimleri Getiremeyen Arkadaşlar İçin 

+ Backend tarafında  FileHelper'ı wwwroot'lu şekilde değiştirmeniz gerekiyor ve API tarafında wwwroot/images
şeklinde kayıt olmalı resimleriniz. FileHelper'ı oluşturduktan sonra resimleri tekrar ekleyin. Backend tarafındaki filehelper'a bakabilirsiniz bunun için.
Daha iyi anlayabilmeniz için bütün arabaların resimleri FileHelper'ı değiştirmeden önceki haliyle getirdim ve değiştirdikten
sonra default bir RentACar logosu yükledim.
![yenideneme2resim](https://user-images.githubusercontent.com/77545922/112863247-52f6ee80-90bf-11eb-9b3c-a07a426224a1.PNG)

+ Ayrıca Api startup.cs tarafında app.UseHttpsRedirection();
 altına app.UseStaticFiles(); eklemeyi unutmayın.

+ Düzenlenen veritabanından sonra araçlar düzensiz bir şekilde görseldeki gibi karşımıza geldi.
Araçlarımızı aldığımıza göre şimdi bunları düzenlemesi kaldı.
![yenideneme2resim2](https://user-images.githubusercontent.com/77545922/112863443-89346e00-90bf-11eb-9f0f-6876dd9a7330.PNG)

+ Backend tarafında getcarDetails ile imagePath'i de alarak ek olarak oluşturduğum getCarImages ve getCarImagesById fonksiyonlarını
sildim yerine cardetail component'ten bütün işlerime devam ettim.
Sadece carcomponent.html tarafında bootstrap'ten basit bir card alarak src kısmına imagepath'i koydum.

+ Bütün veriler tamamlandıktan sonra appcomponent.html'den app-rental, app-customer'ı kaldırdım
sadece app-brand, app-color ve router-outlet'i bıraktım.	

+ Resimlerin boyutları farklı olduğu için bir kayma meydana geldi dengelemek için html'e
width="100" height="200" eklendi.

+ Tasarım düzenlemeleri yapılmadan en basit sonuç aşağıdaki gibi oldu.
![yenideneme2resim3](https://user-images.githubusercontent.com/77545922/112863822-eaf4d800-90bf-11eb-889b-1079c596f4d1.PNG)

+ Araçları marka-renk olarak dışında tek tek tüm araçların gözükebilmesi için car component oluşturuldu. Araca direkt olarak tıklandığında istenilen aracın ekrana getirilmesini sağlamak amacımız. Bunun için ilk başta şöyle bir yol izledim.  CarComponent'i oluşturdum.
Backend tarafında getcarbycarid servisini, managerini,httpget işlemlerini yazdım.

+ İlk olarak düşündüğüm car'ı bir brand gibi düşünüp, tıklandığında cars/:carId routerlink'i verip 
carDetailComponent'e bağlanarak ekrana getirmekti. Bu tabii çalıştı, carDetailComponent tarafında bir elseif
daha ekleyerek gayet düzgün çalıştı.  Ancak sorun şu ki nasıl tüm araçları kart ile gösterdiysek burada da 1 kart gözüküyor ve tüm sayfa koca bir
boşluk gibi gözüküyor aşağıdaki resimde örneği var. 
![yenideneme2resim4](https://user-images.githubusercontent.com/77545922/112896964-b6951200-90e7-11eb-830f-e88fe32195c0.PNG)

+ Bunun için onecardetail diye bir component daha oluşturdum. Burada araca tıklandığında gidilecek yer olsun, 
bütün resimleri toplu şekilde gösterilebilsin, kira durumunu görebilsin diye yönlendireceğim ek sayfa olacak.
Bootstrapten sadece büyük ortalı bir şekilde görülecek bir resim yapısı aldım ve altınada birkaç yazı ekleyerek
basit bir görüntü ortaya çıkardım.
![yenideneme2resim5](https://user-images.githubusercontent.com/77545922/112897029-cb71a580-90e7-11eb-9815-f198d2405997.PNG)

### 3. Kiralama ve Ödeme işlemleri
### 3.1
+ Src-app-pipes oluşturuldu.

Araç-renk-marka için ayrı ayrı pipelar yazıldı
Araçlar MarkaAdı+AraçAdı şeklinde yazıldığı için pipe'da toplama işlemi yapıldı.

+ Pipe'dan daha sonra
Html-selectoption ile car-brand ve color için marka, renk veya özel olarak tüm araçlar listesinden
araç seçimi yapılabilmesi tanımlandı. Seçilen filtreye göre araç ekrana geliyor.

+ Pipe'lı halini comment haline getirdim. Hem search - hem select şeklinde yazabilirsiniz html'inizi
ancak ben sadece select option ile yazdım. pipe filtresine sonradan ihtiyaç duymadım o yüzden.
Arayüz biraz değiştirildi. 

+ Açılır kutuların yanına filtrele ve filtreleri temizle butonları eklendi.
filtrele ile özelliği seçilen araca filtreleri temizle ile anasayfaya dönüyor en basit şekilde.
*****************************
### 3.1.2
+ Detaya git butonu cardetailcomponent'te tamamlandı click event koyuldu routerlink 
onecardetail'e yönlendirildi
onecardetailComponent içerisine  kirala butonu tanımlandı.

+ npm install @angular/animations

npm install ngx-toastr   ile paketler kuruldu

toastr angular.json'da tanımlandı
app.module'da tanımlandı.

Bu kurulan paketler ile kirala butonuna basıldığında sağ alttan bir bildirim getirilerek
güzelleştirildi.
### 3.1.3
*****************************
+ Ancak önemli olan durum araç müsait mi sorgusunu gerçekleştirebilmek.Bunun için backend tarafında getrentalbycarid eklenmeli.

GetRentalByCarId IRentalService'e 

                IDataResult<Rental> GetRentalByCarId(int carId);
               
şeklinde eklendi. Detaylı bir bilgi almayacağımız için, işlemlerimizde returndate ve rentDate kullanacağımız için
bu şekilde döndürdük verimizi. Bu işlemin manager'ını ve api controllerda httpget komutunu yazdık.

+ Bu servis eklendikten sonra backend tarafında rental.add işlemi için

      var result = _rentalDal.GetAll(r => r.CarId == rental.CarId && (r.ReturnDate == null || r.ReturnDate < DateTime.Now)).Any();

eklendi.

+ Frontend tarafında rentalcomponent.ts ve html [Yusuf Akkurt'un](https://github.com/YusufAkkurt/rent-a-car-front/tree/master/src/app) github'ından alındı. Yapılan işlem özet olarak arabanın müsaitliği kontrol ediliyor, müsaitse set edilip ödeme sayfasına yönlendiriliyor.

Gidilecek sayfayı rentalcomponent.ts'de 

        return this.router.navigate(['/cars']);
        
şeklinde ödeme işlemi yönlendiriyorun altında belirtebilirsiniz.

+ Bu işlem biraz zorladı ancak arkadaşlardan baktığımda backend tarafında isRentable() şeklinde tanımlayıp frontend tarafında kullanmak da güzel bir seçenek gibi duruyor. Sevgili Yusuf pairde anlatarak yaptığı için
bu yolu tercih ettim.
### 3.1.4
*****************************
+ Fake Banka servisini yazmak için
backend tarafında FakeCard oluşturuldu.

+ Sırasıyla Entity-DataAccess-Business-API katmanları dolduruldu.
+ Çalışması için business-dependencyresolvers kısmında

            builder.RegisterType<FakeCardManager>().As<IFakeCardService>().SingleInstance();
            builder.RegisterType<EfFakeCardDal>().As<IFakeCardDal>().SingleInstance();

şeklinde çözmeyi unutmayın. 

Ayrıca kart eklemek için Fluentvalidation tarafında kurallarınızı eklemeyi unutmayın. En basit akla gelenkurallarım

            RuleFor(c => c.CardCVV).NotEmpty().MinimumLength(3);
            RuleFor(c => c.CardNumber).NotEmpty().MinimumLength(12);
            RuleFor(c => c.NameOnCard).NotEmpty();
            RuleFor(c => c.MoneyInCard).GreaterThanOrEqualTo(0);
şeklinde

+ SQL Tablosu oluşturuldu ve  DbSet'ten tanımlandı
postman'den kart eklendi.

FakeCard kısmına UserId eklenip kullanıcıyla bağdaştırılabilir. Ancak şu an için basit bir servis denediğim için
gerek duymadım.

+ Frontend tarafında fakeCard modeli-servisi component'i oluşturuldu
component'i ve html'i yazıldı.

### Bu kısım beni biraz zorladı. İleriki zamanlarda buraya dönüp bakacağım şu an için eksikler şu şekilde:

- Arayüz tasarımları tamamen eksik en son proje bittikten sonra bunlarla uğraşılacak.

- Brand ve Color için aynı anda arama eklenmedi. Ama backend tarafında bir fonksiyon tanımlayarak bu kolayca yapılabilir.
Kiralama ve ödeme ile çok uğraştığım için buna bakmadım ama artık ilerlemek istiyorum çok takıldım burada.

- Kiralama menüsünde sadece tarih seçilecek 2 ekran getirildi. Aracın müsaitliğini kontrol etmek gibi bir durum.
Burasıyla payment menüsü birleştirilebilir, araç müsaitliğini kontrol et gibi farklı bi şekilde bakış getirilebilir.
Anasayfada listelenen her araca araç müsait mi butonu ekleyerek bir kontrol sağlanabilir.

- Payment tarafında ise kart bilgilerinin doğruluğu kontrol ediliyor. Kart onaylandıktan sonra bir detaylar sayfası
 ve paranın eksileceği kısım tanımlanmadı

Projenin bu kısmının Rent bölümünde yaptığı Pair ve paylaştığı kodlar için Yusuf Akkurt'a teşekkürler.

### 3.2 Resimler

3.1 Pipe'ların eklendiği kısım.
![yenideneme3](https://user-images.githubusercontent.com/77545922/113430805-78e40200-93e3-11eb-8ece-725388c5cb85.PNG)

3.1 Select-option eklendiği kısım.
![yenideneme3 1](https://user-images.githubusercontent.com/77545922/113430880-987b2a80-93e3-11eb-8dfe-c13f955371b7.PNG)

3.1.3 Kiralama sorgusu
![yenideneme3rental](https://user-images.githubusercontent.com/77545922/113430975-bba5da00-93e3-11eb-966c-69643bcca49f.PNG)

3.1.4 Ödeme İşlemi
![yenideneme3 5payment](https://user-images.githubusercontent.com/77545922/113479790-b30fdb00-9499-11eb-8d0f-43c7c480329f.PNG)






