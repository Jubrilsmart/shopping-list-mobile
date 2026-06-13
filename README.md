# Shopping List — Mobile App

A cross-platform mobile shopping list app built with React Native and Expo. The mobile counterpart to the [web version](https://ismail-jibrin.vercel.app/shopping), rebuilt natively for Android and iOS with persistent storage and global state management.

---

## Features

- Add, edit, and delete shopping items (full CRUD)
- Check off items as you shop
- Persistent storage with AsyncStorage — data survives app restarts
- Global state management with Zustand
- Clean, responsive UI styled with NativeWind (Tailwind CSS for React Native)
- Works on Android and iOS via Expo Go

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Expo](https://expo.dev) | React Native framework and tooling |
| [Zustand](https://zustand-demo.pmnd.rs) | Lightweight global state management |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistent local storage |
| [NativeWind](https://www.nativewind.dev) | Tailwind CSS utility classes for React Native |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI — `npm install -g expo-cli`
- Expo Go app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/shopping-list-mobile.git

# Navigate into the project
cd shopping-list-mobile

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with Expo Go on your phone.

---

## Project Structure

```
shopping-list-mobile/
├── app/
│   ├── index.tsx              # Main screen
│   └── _layout.tsx            # Root layout and navigation
├── components/
│   ├── AddItemModal.tsx        # Modal for adding new items
│   ├── ConfirmClearModal.tsx   # Modal for clearing the list
│   ├── ThemeToggle.tsx         # Light/dark mode toggle
│   └── ui/                    # Base UI primitives
├── store/
│   └── useShoppingStore.ts    # Zustand store — state and actions
├── constants/
│   └── theme.ts               # Theme constants
├── hooks/                     # Custom hooks (color scheme, theming)
├── assets/                    # App icons and images
└── app.json                   # Expo config
```

---

## Related

- Web version — [ismail-jibrin.vercel.app/shopping](https://ismail-jibrin.vercel.app/shopping)
- Portfolio — [ismail-jibrin.vercel.app](https://ismail-jibrin.vercel.app)

---

## Author

**Ismail Jibrin** — Frontend Developer
[Portfolio](https://ismail-jibrin.vercel.app) · [Email](mailto:Jubrilsmart1@gmail.com)
