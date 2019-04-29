using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using angular.Data;
using angular.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace angular.Controllers
{
    [Route("api/[controller]")]
    public class PaymentDetailController : Controller
    {
        private readonly AppDbContext _context;
        public PaymentDetailController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet()]
        public async Task<IEnumerable<PaymentDetail>> GetAll()
        {
            if (!await _context.PaymentDetails.AnyAsync())
            {
                await Initialize();
            }
            return await _context.PaymentDetails.ToListAsync();
        }
        private async Task<bool> Initialize()
        {
            _context.PaymentDetails.Add(new PaymentDetail()
            {
                CVV = "343",
                CardNumber = "24374654756476",
                CardOwner = "Abdulrahman Sulaiman",
                ExpDate = "22/09/2021",
                Id = "9addcc5c-7327-4aaa-a5a2-3ebcb840ae21"
            });
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbException)
            {
                return false;
            }

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPaymentDetail(string id, [FromBody]PaymentDetail paymentDetail)
        {
            if (id != paymentDetail.Id)
            {
                return BadRequest("Id not maching");
            }
            if (ModelState.IsValid)
            {

                try
                {
                    _context.PaymentDetails.Update(paymentDetail);
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
                catch (DbUpdateException ex)
                {
                    if (await PaymentDetailExist(id))
                    {
                        return BadRequest(ex.Message);
                    }
                    return NotFound();
                }
            }
            return BadRequest("Model not Valid");
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDetail>> GetPaymentDetail(string id)
        {
            var paymentDetail = await _context.PaymentDetails.FirstOrDefaultAsync(a => a.Id == id);
            if (paymentDetail != null)
            {
                return paymentDetail;
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<PaymentDetail>> CreatePaymentDetail([FromBody]PaymentDetail paymentDetail)
        {
            paymentDetail.GenerateID();
            if (ModelState.IsValid)
            {
                _context.PaymentDetails.Add(paymentDetail);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPaymentDetail), new { paymentDetail.Id }, paymentDetail);
            }
            return BadRequest("Invalid Format");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PaymentDetail>> DeletePaymentDetail(string id)
        {
            var paymentDetail = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetail != null)
            {
                _context.PaymentDetails.Remove(paymentDetail);
                await _context.SaveChangesAsync();
                return paymentDetail;
            }
            return NotFound();
        }
        public async Task<bool> PaymentDetailExist(string id)
        {
            return await _context.PaymentDetails.AnyAsync(e => e.Id == id);
        }
    }
}