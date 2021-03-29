# Angular ile RentACar-Frontend 
## :mag:Başlarken

Web uygulamaları geliştirmek için kullandığımız, Google tarafından geliştirilen bir framework.

+Visual Studio Code kullandık.
+Nodejs 14.16.0 LTS kurulumu yaptık.
+Angular cli kurulumu yaptık. (npm install -g @angular/cli)
+Projemizi oluşturduk.
+Bootstrap v5.0.0-beta3 kurduk.

## :scroll:Geliştirmeler

### 1. Veriler Api tarafından çekilmeye çalışıldı.

**Hiçbir güzelleştirme olmadan sadece api'den veriler çekmeye çalışıldı.
Sırasıyla markalar,renkler,müşteriler,arabalar,kiralamalar listelendi.**

+Öncelikle çekmek istediğimiz veriler ve navbar için components klasörü oluşturuldu.
daha sonra models ve services klasörü oluşturuldu.

+Verileri çekmek için (sadece brand'i düşünürsek)

*brand , brandResponseModel, responseModel* modelleri oluşturuldu.

+Services klasörünün içinde
*brandService* oluşturuldu. HttpClient import edildi.(hem servis için hem app-module içinde(HttpClientModule))

+Servis içerisinde apiUrl yolu belli edilerek *getBrands()* yazıldı.

+brandComponent'te servis private tanımlanarak *getBrands()* çağırılıp subscribe olundu.
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

