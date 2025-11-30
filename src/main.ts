// src/main.ts
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';

import localeTh from '@angular/common/locales/th';
import localeEn from '@angular/common/locales/en';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';

// ลงทะเบียนข้อมูล locale (วันที่/ตัวเลข ฯลฯ)
registerLocaleData(localeTh, 'th');
registerLocaleData(localeEn, 'en');

if (environment.production) {
  enableProdMode();
  if (window) selfXSSWarning();
}

// ตรวจจับภาษา จาก segment แรกของ path: /th/... หรือ /en/...
function detectLocale(): 'th' | 'en' {
  const seg = (location.pathname.split('/')[1] || '').toLowerCase();
  return seg === 'en' ? 'en' : 'th';
}

async function bootstrap() {
  const locale = detectLocale();

  // ตั้ง <html lang="..."> ให้ตรงกับภาษา
  document.documentElement.lang = locale;

  // โหลดคำแปลแบบ runtime จาก /assets/i18n/messages.{lang}.json
  try {
    const res = await fetch(`/assets/i18n/messages.${locale}.json`, { cache: 'no-cache' });
    if (res.ok) {
      const dict = await res.json();
      loadTranslations(dict);
    } else {
      // ถ้าไม่เจอไฟล์ จะปล่อยให้ใช้ข้อความต้นฉบับ
      console.warn(`i18n: missing messages for locale "${locale}"`);
    }
  } catch (e) {
    console.warn('i18n: failed to load runtime messages', e);
  }

  await bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule, AppRoutingModule),
      provideAnimations(),
      { provide: LOCALE_ID, useValue: locale }, // ให้ Angular Pipes ใช้ locale ที่ถูกต้อง
    ],
  });
}

bootstrap().catch(err => console.error(err));

function selfXSSWarning() {
  setTimeout(() => {
    console.log(
      '%c** STOP **',
      'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding: 5px 15px; border-radius: 25px;'
    );
    console.log(
      '\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.',
      'font-weight:bold; font: 2em Arial; color: #e11d48;'
    );
  });
}
