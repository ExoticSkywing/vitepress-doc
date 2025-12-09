# 可用好用API收集

> 以下 API 均经过实际测试验证，按准确性和实用性排序

---

## 1. ipdata.co ⭐⭐⭐⭐⭐（准确，功能最全）

**API 地址：**
```
https://api.ipdata.co/{ip}?api-key=YOUR_KEY
```

**实测结果：**
- ✅ **非常准确**（Cloudflare 查询错误的，这个查询正确）
- ✅ 功能最全（威胁情报、VPN检测、代理检测）
- ✅ HTTPS 支持
- ✅ 支持中文

**官方说明：**
> "We give you 1500 free requests daily to get started on your project.  
> This free tier is restricted to non-commercial use."

**免费额度：**
- 📊 1,500 请求/天（非商业用途）
- 💰 付费版：$25/月起（100,000请求）

**特色功能：**
- 🔒 威胁情报（检测恶意IP）
- 🛡️ VPN/代理检测
- 🌐 时区、货币、语言信息

**推荐指数：⭐⭐⭐⭐⭐**

---

## 2. ipwhois.io ⭐⭐⭐⭐⭐（完全免费，准确）

**API 地址：**
```
https://ipwhois.app/json/{ip}?lang=zh-CN
```

**官方承诺：**
> "Fast response and accurate data"  
> "Free for small projects. Our API is free for up to 10,000 requests per month"

**实测结果：**
- ✅ **很准确**（实测验证通过）
- ✅ **完全免费**（无需注册）
- ✅ HTTPS 支持
- ✅ 中文支持
- ✅ 无需 API Key

**免费额度：**
- 📊 10,000 请求/月（通过 IP 和 Referer 识别）
- 💰 完全免费，无付费版

**响应格式：**
- 支持 JSON、XML、CSV

**示例请求：**
```bash
curl https://ipwhois.app/json/xxx.xxx.xxx.xxx?lang=zh-CN
```

**推荐指数：⭐⭐⭐⭐⭐**

---

## 3. ipapi.co ⭐⭐⭐⭐（准确，响应快）

**API 地址：**
```
https://ipapi.co/{ip}/json/?lang=zh-CN
```

**特点：**
- ✅ HTTPS 支持
- ✅ 城市数据准确（使用 MaxMind 数据库）
- ✅ 中文支持
- ✅ 响应快（<100ms）
- ✅ 数据完整（ASN、ISP、经纬度、时区）
- ✅ 无需注册

**免费额度：**
- 📊 30,000 请求/月（1,000/天）
- 💰 付费版：$10/月起（50,000请求）

**示例响应：**
```json
{
  "ip": "xxx.xxx.xxx.xxx",
  "city": "上海",
  "region": "上海市",
  "country": "CN",
  "country_name": "中国",
  "org": "AS4134 Chinanet",
  "asn": "AS4134"
}
```

**推荐指数：⭐⭐⭐⭐**

---

## 4. ip-api.com ⭐⭐⭐⭐（经典选择）

**API 地址：**
```
http://ip-api.com/json/{ip}?lang=zh-CN
```

**特点：**
- ✅ 中文支持
- ✅ 准确度高
- ✅ 无需注册
- ❌ 仅支持 HTTP（不支持 HTTPS）

**免费额度：**
- 📊 45 请求/分钟
- 💰 付费版：$13/月起（支持 HTTPS）

**推荐指数：⭐⭐⭐⭐**

---

## 5. ipgeolocation.io ⭐⭐⭐（最精准但免费版信息有限）

**API 地址：**
```
https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_KEY&ip={ip}
```

**实测结果：**
- ✅ **非常精准**（实测中国IP定位完全正确）
- ✅ **字段最全**（包含街道信息！）
- ✅ HTTPS 支持
- ✅ 支持中文
- ✅ 多数据源融合，准确度极高

**免费额度：**
- 📊 1,000 请求/天（30,000/月）
- 💰 付费版：$15/月起（150,000请求）

**限制：**
- ⚠️ 需要注册获取 API Key（免费）

**示例响应：**
```json
{
  "ip": "xxx.xxx.xxx.xxx",
  "country_name": "中国",
  "state_prov": "上海市",
  "city": "上海",
  "district": "黄浦",  // 街道信息！
  "isp": "Chinanet",
  "organization": "CHINANET-BACKBONE",
  "asn": "AS4134"
}
```

**推荐指数：⭐⭐⭐**

---

## 📊 综合对比表

| API | 免费额度 | HTTPS | 中文 | 实测准确性 | 推荐指数 |
|-----|---------|-------|------|-----------|---------|
| **ipdata.co** | 1500/天 | ✅ | ✅ | ⭐⭐⭐⭐⭐ **很准**信息很全 | ⭐⭐⭐⭐⭐ |
| **ipwhois.io** | 10k/月 | ✅ | ✅ | ⭐⭐⭐⭐⭐ **很准** | ⭐⭐⭐⭐⭐ |
| **ipapi.co** | 1000/天 | ✅ | ✅ | ⭐⭐⭐⭐ 准确 | ⭐⭐⭐⭐ |
| **ip-api.com** | 45/分钟 | ❌ | ✅ | ⭐⭐⭐⭐ 准确 | ⭐⭐⭐⭐ |
| **ipgeolocation.io** | 1000/天 | ✅ | ✅ | ⭐⭐⭐ **最精准**但免费版信息有限 | ⭐⭐⭐ |

---

## 🎯 使用建议

### 场景1：最高准确性 + 需要街道信息
**推荐：ipgeolocation.io**
- 包含街道级别信息
- 多数据源融合，准确度最高
- 1000次/天足够大多数项目使用

### 场景2：小项目，完全免费
**推荐：ipwhois.io**
- 10,000次/月完全免费
- 无需注册，无需 API Key
- 实测准确度高

### 场景3：高并发，功能需求多
**推荐：ipdata.co**
- 1500次/天
- 附带威胁情报、VPN检测等高级功能
- 实测纠正了 Cloudflare 的错误

### 场景4：简单快速，无需注册
**推荐：ipapi.co**
- 1000次/天
- 无需注册
- 响应速度快

---

## ⚠️ 不推荐的 API

### ❌ Cloudflare 原生数据（request.cf）
**问题：**
- 城市级别数据经常不准确
- 实测案例：中国IP被识别为上海

**适用场景：**
- 仅需要国家级别数据
- 仅需要 ASN 信息
- 作为最后的降级方案

---

## 💡 多 API 轮询方案（推荐）

**策略：按优先级依次尝试，失败则切换下一个**

```javascript
async function getGeoInfo(ip) {
  const apis = [
    {
      name: 'ipgeolocation.io',
      url: `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`,
      parse: (data) => ({
        country: data.country_name,
        city: data.city,
        district: data.district,  // 街道信息
        isp: data.organization,
        asn: data.asn
      })
    },
    {
      name: 'ipwhois.io',
      url: `https://ipwhois.app/json/${ip}?lang=zh-CN`,
      parse: (data) => ({
        country: data.country,
        city: data.city,
        isp: data.isp,
        asn: `AS${data.asn}`
      })
    },
    {
      name: 'ipapi.co',
      url: `https://ipapi.co/${ip}/json/?lang=zh-CN`,
      parse: (data) => ({
        country: data.country_name,
        city: data.city,
        isp: data.org,
        asn: data.asn
      })
    }
  ];
  
  for (const api of apis) {
    try {
      const response = await fetch(api.url, { 
        signal: AbortSignal.timeout(3000) 
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, data: api.parse(data), source: api.name };
      }
    } catch (error) {
      console.warn(`${api.name} 失败:`, error);
      continue;
    }
  }
  
  // 全部失败，降级到 Cloudflare（仅国家+ASN）
  return { 
    success: false, 
    data: {
      country: request.cf.country,
      city: request.cf.city + ' (可能不准)',
      isp: request.cf.asOrganization,
      asn: `AS${request.cf.asn}`
    },
    source: 'cloudflare' 
  };
}
```

---

## 📝 更新日志

- **2025-11-09**：基于实际测试更新，移除 ipinfo.io（不准确）
- **实测验证**：所有 API 均使用中国IP（xxx.xxx.xxx.xxx）进行测试
- **准确性排名**：ipgeolocation.io > ipwhois.io = ipdata.co > ipapi.co > ipapi.com = ip-api.com > Cloudflare