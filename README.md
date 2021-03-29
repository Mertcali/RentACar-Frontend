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

+ resimlerin gösterilip gösterilmediğini test etmek için 
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
sadece carcomponent.html tarafında bootstrap'ten basit bir card alarak src kısmına imagepath'i koydum.

+ Bütün veriler tamamlandıktan sonra appcomponent.html'den app-rental, app-customer'ı kaldırdım
sadece app-brand, app-color ve router-outlet'i bıraktım.	

+ Resimlerin boyutları farklı olduğu için bir kayma meydana geldi dengelemek için html'e
width="100" height="200" eklendi.

+ Tasarım düzenlemeleri yapılmadan en basit sonuç aşağıdaki gibi oldu.
![yenideneme2resim3](https://user-images.githubusercontent.com/77545922/112863822-eaf4d800-90bf-11eb-889b-1079c596f4d1.PNG)


