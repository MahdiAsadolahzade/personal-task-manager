# Personal Task Manager 📝

A modern and responsive task management application built with **Next.js**, designed for personal productivity. This app is built to work smoothly on desktop, mobile, and as a PWA.

## 🌐 Live Website
👉 [https://personal-task-manager.ir](https://personal-task-manager.ir)

- ✅ Android app (PWA) available
- ✅ Full support for mobile and offline usage
- ✅ Introductions and updates included on the website

## 🚀 Demo
- Web App: [https://personal-task-manager-ten.vercel.app/](https://personal-task-manager-ten.vercel.app/)

---

## ✨ Features

- 📅 Calendar-based task management
- 🏷️ Categorized by priority, status, and type
- 🔁 Support for recurring tasks
- 🌙 Dark/light theme toggle
- 📤 File upload support for tasks
- ✅ Subtasks with checklist support
- 🔧 Dialogs and detailed task views
- 💾 Offline support via IndexedDB
- 📱 PWA (Progressive Web App) support
- 📲 Android build with Capacitor



---

## 🧰 Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- State Management: [Zustand](https://zustand-demo.pmnd.rs/)
- Form Validation: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- Mobile Build: [Capacitor](https://capacitorjs.com/)
- Storage: IndexedDB (via custom utility)
- Deployment: Vercel

---

## ⚙️ Installation & Development

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/personal-task-manager.git
cd personal-task-manager

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```
## Project Tree

personal-task-manager,
├─ .gitignore,
├─ android,
│  ├─ .gitignore,
│  ├─ capacitor-cordova-android-plugins,
│  │  ├─ cordova.variables.gradle,
│  │  └─ src,
│  │     └─ main,
│  │        ├─ AndroidManifest.xml,
│  │        ├─ java,
│  │        │  └─ .gitkeep,
│  │        └─ res,
│  │           └─ .gitkeep,
│  ├─ capacitor.settings.gradle,
│  ├─ gradle,
│  │  └─ wrapper,
│  │     ├─ gradle-wrapper.jar,
│  │     └─ gradle-wrapper.properties,
│  ├─ gradlew,
│  ├─ gradlew.bat,
│  ├─ settings.gradle,
│  └─ variables.gradle,
├─ assets,
│  ├─ icon-background.png,
│  ├─ icon-foreground.png,
│  ├─ icon-only.png,
│  ├─ splash-dark.png,
│  └─ splash.png,
├─ capacitor.config.ts,
├─ eslint.config.mjs,
├─ next.config.ts,
├─ package-lock.json,
├─ package.json,
├─ postcss.config.mjs,
├─ public,
│  ├─ icons,
│  │  ├─ add.svg,
│  │  ├─ archived.svg,
│  │  ├─ bug-report.svg,
│  │  ├─ calendar.svg,
│  │  ├─ completed.svg,
│  │  ├─ confirm.svg,
│  │  ├─ contact.svg,
│  │  ├─ custom.svg,
│  │  ├─ delete.svg,
│  │  ├─ edit.svg,
│  │  ├─ feature.svg,
│  │  ├─ filter.svg,
│  │  ├─ general.svg,
│  │  ├─ health.svg,
│  │  ├─ high.svg,
│  │  ├─ icon-128.webp,
│  │  ├─ icon-192.webp,
│  │  ├─ icon-192x192.png,
│  │  ├─ icon-256.webp,
│  │  ├─ icon-48.webp,
│  │  ├─ icon-512.webp,
│  │  ├─ icon-512x512.png,
│  │  ├─ icon-72.webp,
│  │  ├─ icon-96.webp,
│  │  ├─ in-progress.svg,
│  │  ├─ info.svg,
│  │  ├─ Logo.svg,
│  │  ├─ low.svg,
│  │  ├─ medium.svg,
│  │  ├─ pending.svg,
│  │  ├─ personal.svg,
│  │  ├─ profile.png,
│  │  ├─ project.svg,
│  │  ├─ qr-code.svg,
│  │  ├─ repetitive.svg,
│  │  ├─ request.svg,
│  │  ├─ unknown.svg,
│  │  ├─ update.svg,
│  │  └─ work.svg,
│  ├─ manifest.json,
│  └─ sw.js,
├─ README.md,
├─ src,
│  ├─ components,
│  │  ├─ calendar,
│  │  │  ├─ Calendar.tsx,
│  │  │  └─ CalendarDay.tsx,
│  │  ├─ card,
│  │  │  ├─ Card.tsx,
│  │  │  └─ FilterCard.tsx,
│  │  ├─ dialog,
│  │  │  ├─ AboutProject.tsx,
│  │  │  ├─ Dialog.tsx,
│  │  │  ├─ TaskShow.tsx,
│  │  │  └─ UpdateNote.tsx,
│  │  ├─ inputs,
│  │  │  ├─ AutoComplete.tsx,
│  │  │  ├─ Checkbox.tsx,
│  │  │  ├─ customs,
│  │  │  │  └─ RecurrenceRule.tsx,
│  │  │  ├─ FileUploadField.tsx,
│  │  │  ├─ TextArea.tsx,
│  │  │  └─ TextField.tsx,
│  │  ├─ layout,
│  │  │  └─ Header.tsx,
│  │  ├─ loadings,
│  │  │  └─ Spinner.tsx,
│  │  ├─ menu,
│  │  │  └─ Menu.tsx,
│  │  ├─ NavLink.tsx,
│  │  ├─ sections,
│  │  │  ├─ IconsList.tsx,
│  │  │  ├─ PriorityBadge.tsx,
│  │  │  ├─ StatusBadge.tsx,
│  │  │  ├─ SubTaskList.tsx,
│  │  │  ├─ TasksList.tsx,
│  │  │  └─ TypeBadge.tsx,
│  │  ├─ ThemeToggle.tsx,
│  │  ├─ typography,
│  │  │  └─ Title.tsx,
│  │  └─ utils,
│  │     └─ Icon.tsx,
│  ├─ constants,
│  │  ├─ card,
│  │  │  └─ cardData.ts,
│  │  ├─ dialog,
│  │  │  └─ dialogData.ts,
│  │  ├─ version.ts,
│  │  └─ versions,
│  │     ├─ 1.0.0.ts,
│  │     ├─ 1.0.1.ts,
│  │     └─ index.ts,
│  ├─ data,
│  │  └─ dialogArrays,
│  │     ├─ configuration.ts,
│  │     ├─ settings.ts,
│  │     └─ tasks.ts,
│  ├─ hooks,
│  │  ├─ useAppVersionControl.ts,
│  │  ├─ useRouteTransition.ts,
│  │  └─ useScreenSizeDetector.ts,
│  ├─ lib,
│  │  ├─ actions,
│  │  │  └─ sendReportEmail.ts,
│  │  ├─ config.ts,
│  │  ├─ dynamicUseForm.ts,
│  │  ├─ getVersions.ts,
│  │  ├─ storage,
│  │  │  └─ indexedDBStorage.ts,
│  │  ├─ upload,
│  │  │  └─ convertFileToBase64.ts,
│  │  └─ utils,
│  │     ├─ dateConverts.ts,
│  │     ├─ fieldErrors.ts,
│  │     ├─ finders.ts,
│  │     ├─ recurrence.ts,
│  │     └─ strings.ts,
│  ├─ mock,
│  │  ├─ frequency.data.ts,
│  │  ├─ icon_data.ts,
│  │  ├─ priority.data.ts,
│  │  ├─ statuses.data.ts,
│  │  └─ types.data.ts,
│  ├─ models,
│  │  ├─ app.model.ts,
│  │  ├─ global.model.ts,
│  │  ├─ icon.model.ts,
│  │  ├─ task.model.ts,
│  │  ├─ task_status.model.ts,
│  │  └─ task_type.model.ts,
│  ├─ schemas,
│  │  ├─ icon.schema.ts,
│  │  ├─ request.schema.ts,
│  │  ├─ status.schema.ts,
│  │  ├─ task.schema.ts,
│  │  └─ type.schema.ts,
│  ├─ stores,
│  │  ├─ app.store.ts,
│  │  ├─ createPersistedStore.ts,
│  │  ├─ dialog.store.ts,
│  │  ├─ helpers,
│  │  │  └─ withGlobal.ts,
│  │  ├─ icons.store.ts,
│  │  ├─ task.store.ts,
│  │  ├─ task_status.store.ts,
│  │  └─ task_type.store.ts,
│  └─ types,
│     ├─ app.type.ts,
│     ├─ dialog.type.ts,
│     ├─ icon.type.ts,
│     ├─ inputs.type.ts,
│     ├─ notifications.d.ts,
│     └─ task.type.ts,
└─ tsconfig.json,

```