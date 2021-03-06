import { useForm } from "react-hook-form";
import "./styles.css";

export default function App() {
  const {
    // register - որը թույլա տալիս լրացենլ տարբեր դաշտեր
    register,
    // formState - օբյեկտա որը ունի հառկությոներ
    // formState - errors - պահվումա սխալները
    formState: { errors, isValid },
    // Ուղարկելու համարա
    handleSubmit,
    // reset մեթոդը օգտագործում ենք ուղարկելուց հետո ջնջենք դաշտերի տվյալները
    reset
  } = useForm({
    // useForm() - կարող ենք տալ օբյեկտ իրա settings-ով կանչվելու ժամանակ
    // Ամենա հադիպող setting-ը դա mode-ն է որը ունի 5 տեսակի ռեժիմ
    // default mode: "onSubmit"-է վալիդացյան կատարվում է ուղարկվելու       ժամանակ
    // mode: "all" - միշտ ստուգի
    // mode: "onBlur" - Blur - ժամանակ ստուգի հենց focus հանեք դաշտի վրայից
    // mode: "onChange" - ․․․
    // mode: "onTouched" - ․․․
    mode: "onBlur"
  });

  // useForm - օգտագործելուց չի լինում ամեն անգամ render

  const onSubmit = (data) => {
    // Սա կաշխատի երբ չունենաք ոչ մի սխալ form-ում
    alert(JSON.stringify(data));

    // կանչում ենք reset մեթոդը
    reset();
  };

  return (
    <div className="App">
      <h1 className="h1">React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name
          {/* useForm-մեթոդա որւ վերադարձնումա օբյեկտ դրա հմար անում ենք destructuring */}
          {/* register փոխանցում ենք 2 պարամետր */}
          {/* register-ի 1-ին պարամետրը դա նրա ունիկալ անունըն է input-ի համար*/}
          {/* register-ի 2-րդ պարամետրը ընդունումա օբյկետ որը օգտագործում են վալիդացիայի համար */}
          <input
            {...register("firstName", {
              // // required - նշում ենք որ բռնի սխալ
              // required: true
              // true - փոխարեն կարող ենք տալ message սխալի տեքստը ցույց տալու համար բայց true մնումա
              required: "Այս դաշտը պարտադիր է",

              // // minLength - ամենաքիչը սիմվոլների քանակը լինի 5
              // Տարբերակ 1 , ուղակի սխալի տեքստը տպելույա "Error"
              // minLength: 5

              minLength: {
                // ամենաքիչը սիմվոլների քանակը լինի 5
                value: 3,
                // Սխալի տեքստը
                message: "Մինիմում 3 տառ"
              }
            })}
          />
          <div style={{ height: 40 }}>
            {errors?.firstName && (
              <p>
                {/* Ստուգում ենք եթե կա message թող տպի հակառակ դեպքում տպի "Error" տեքստը*/}
                {errors?.firstName.message || "Error"}
                {/* "Error" */}
              </p>
            )}
          </div>
        </label>
        <label>
          Last Name
          <input
            {...register("lastName", {
              required: "Այս դաշտը պարտադիր է",
              minLength: {
                value: 5,
                message: "Մինիմում 5 տառ"
              }
            })}
          />
          <div style={{ height: 40 }}>
            {errors?.lastName && <p>{errors?.lastName.message || "Error"}</p>}
          </div>
        </label>

        <input type="submit" value="submit" disabled={!isValid} />
      </form>
    </div>
  );
}
