# jsxq

Make jsx accepts `q` props as a shorthand alias for `className`.

I usually give class names to elements for styling, but since the prop `className` is a long word for how often it is used. I therefore created a wrapper for the jsx runtime that allows `className` to be written in short props called `q`.

This library is assumed to be used in conjunction with React.

## install

```
npm install jsxq
```

## configuration

tsconfig.json
```json
{
  "compilerOptions": {
    ...,
    "jsx": "react-jsx",
    "jsxImportSource": "jsxq",
  }
}
```
Specify `jsxq` for `jsxImportSource`.

## code example

Say there is a jsx code with `className` as follows
```tsx
  <div className="article-card">
    <div className="header-row">
      <div className="icon">{article.authorIcon}</div>
      <div className="name">{article.authorName}</div>
    </div>
    <div className="content-row">{article.contentText}</div>
  </div>
```

Now it can be written this way using `q` props
```tsx
  <div q="article-card">
    <div q="header-row">
      <div q="icon">{article.authorIcon}</div>
      <div q="name">{article.authorName}</div>
    </div>
    <div q="content-row">{article.contentText}</div>
  </div>
```

## multiple classnames

```tsx
  <div q={["foo", "bar", "buzz"]} />
```
Props `q` accepts an array of classname values


## if props
There is `if` props added for conditional rendering. It is similar to `ngIf` in angular or `v-if` in vue.
```tsx
  <div if={someCondition}>hello</div>
```
it results equivalent to
```tsx
  {someCondition && <div>hello</div> }
```

## q props propagation

Function components accepts q props as the same as the usual html tag elements.
If a q props passed to a function component, it is applied to the root element of rendered dom. It's useful to customize the appearance of the component.

```tsx
const HelloComponent = () => <div>world</div>;

<HelloComponent q="hello" />;
//--> renders <div class="hello">world</div>
```



Happy Coding!!

## License
MIT
