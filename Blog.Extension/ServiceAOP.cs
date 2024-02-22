using Blog.Common;
using Castle.DynamicProxy;

using Newtonsoft.Json;
using System.Reflection;

namespace Blog.Extension
{
    /// <summary>
    /// 拦截器AOP 继承IInterceptor接口
    /// </summary>
    public class ServiceAOP : IInterceptor
    {

        /// <summary>
        /// 实例化IInterceptor唯一方法 
        /// </summary>
        /// <param name="invocation">包含被拦截方法的信息</param>
        public void Intercept(IInvocation invocation)
        {
            Console.WriteLine("Before");

            invocation.Proceed();

            Console.WriteLine("After");
        }
    }
}